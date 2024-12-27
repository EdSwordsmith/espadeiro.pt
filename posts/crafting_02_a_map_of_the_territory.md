---
title = "Crafting Interpreters - Part 2: A Map of the Territory"
date = 2022-08-10T16:07:38+02:00
description = "Part 2 of following the book Crafting Interpreters in implementing interpreters for the Lox programming language."
---


> This post is based on my notes from following the [Crafting Interpreters book](https://craftinginterpreters.com/).
> The complete code and notes are available in this [repository](https://github.com/EdSwordsmith/crafting_interpreters).

1. I decided to look at the source code of the go compiler. Going through it, I managed to find a scanner folder with a scanner.go file in it and the same for the parser, no .y or .l files found, so it's handwritten.

2. For this one, I had to read a little bit more about Just-in-time compilation. Most likely there are other reasons but the I one I found was overheads during runtime while compiling.

3. Having an interpreter as well allows the user to test the code without having to compile it or maybe even having a REPL that the user can use to test small pieces of code while coding.
