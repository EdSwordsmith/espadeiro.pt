---
title = "Crafting Interpreters - Part 3: The Lox Language"
date = 2022-08-10T18:53:15+02:00
description = "Part 3 of following the book Crafting Interpreters in implementing interpreters for the Lox programming language."
---


> This post is based on my notes from following the [Crafting Interpreters book](https://craftinginterpreters.com/).
> The complete code and notes are available in this [repository](https://github.com/EdSwordsmith/crafting_interpreters).

First, I thought of how to make a class inside another class. The language only allows methods inside a class, the only way to accomplish this was defining a class inside a method.

Couldn't really think of any edge case behavior, but I'm curious to see how classes work since they seem to work as objects as well, since we can make a function that returns a class or store one in a variable.

On features that I think are missing I would say the biggest one is arrays, had to make a class for having a list. Another would be anonymous functions, since function declarations aren't expressions. And functional programming functions such as map, reduce, and filter would be nice to have.
