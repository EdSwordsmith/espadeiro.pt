---
title = "Crafting Interpreters - Part 1: Introduction"
date = 2022-08-08T18:11:21+02:00
description = "Part 1 of following the book Crafting Interpreters in implementing interpreters for the Lox programming language."
---


> This post is based on my notes from following the [Crafting Interpreters book](https://craftinginterpreters.com/).
> The complete code and notes are available in this [repository](https://github.com/EdSwordsmith/crafting_interpreters).

Initially I was going to go through the book normally, writing the first part in Java (as you can see in my commit history), but I ended up having some second thoughts and decided that I'll be using rust.

I'll still be using c for the second part, only decided to switch Java with rust. Anyway, I've kept the java "hello world" in the challenges.

For the first challenge of this page "*There are at least six domain-specific languages used in the little system I cobbled together to write and publish this book. What are they?*", I found the following domain-specific languages:
- Bash
- Markdown
- Make
- XML
- SCSS
- HTML (Mustache Templates)

For the doubly linked list challenge, I decided to try and code in a different way for fun. Made a few macros for creating a "RESULT" struct similar to how Result is used in Rust and used it in every function that could return an error.
