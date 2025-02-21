---
title = "Crafting Interpreters - Part 7: Evaluating Expressions"
date = 2024-01-30T11:04:03Z
description = "Part 7 of following the book Crafting Interpreters in implementing interpreters for the Lox programming language."
---


> This post is based on my notes from following the [Crafting Interpreters book](https://craftinginterpreters.com/).
> The complete code and notes are available in this [repository](https://github.com/EdSwordsmith/crafting_interpreters).

Evaluating expressions by traversing the AST using a visitor was simple to implement. Again, the bigger challenge in this chapter was adding runtime errors, since I can't use exceptions. I declared a new struct for these type of errors (`RuntimeError`) and changed the `Errors` struct to instead be an enum with two variants:
- `Parsing` - this one has the previous vector of `LoxError` with errors from both the scanner and the parser
- `Runtime` - and this one has a `RuntimeError`

Rewrote the `ReportErrors` trait, so that the `report_and_exit` method determines the exit code from the `Errors` variant instead of receiving it as an argument.  

Some things were easier to implement in Rust when compared to the Java present in the book, such as the equality and inequality operators where I only had to make the `Object` enum derive `PartialEq` and now it's possible to use `==` and `!=` in the code to compare two values.

## Challenges
1. Yes, I would extend it to allow comparison between strings with ordering being based on the corresponding code for each character, as it is done in Python for example. I wouldn't extend it for comparison among mixed types as I believe that is confusing and implicitly converting one of the values before comparing in a way that isn't completely clear to the programmer.

2. The code for this challenge can be found [here](https://github.com/EdSwordsmith/crafting_interpreters/tree/7_implicit_string_concat).

3. So the following is what happens when dividing by zero:
```
> 1 / 0
inf
> -1 / 0
-inf
> 1 / 0 - 1 / 0
NaN
```

We may get `inf` and `-inf`, but if we do any operation that is undefined with infinity then we will get `NaN` as this is how `f64` works in Rust. I've checked and doubles in Java seem to work in the same way. On the other hand, Python throws a runtime error when dividing by zero. I like the approach taken by Rust and Java, as resulting in infinity is mathematically correct and some operations may actually be used with these values and could be helpful in some programs.

The code for this challenge can be found [here](https://github.com/EdSwordsmith/crafting_interpreters/tree/7_divide_by_zero).
