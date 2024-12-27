---
title = "Crafting Interpreters - Part 5: Representing Code"
date = 2022-08-16T21:39:08+01:00
description = "Part 5 of following the book Crafting Interpreters in implementing interpreters for the Lox programming language."
---


> This post is based on my notes from following the [Crafting Interpreters book](https://craftinginterpreters.com/).
> The complete code and notes are available in this [repository](https://github.com/EdSwordsmith/crafting_interpreters).

For this I initially thought of doing in a similar way and generating the AST code. I actually had that working but I quickly realized that the code is way simpler in rust than it is in java and doesn't really justify the effort of writing something to generate it.

```rust
use crate::scanner::Token;

pub enum Object {
    Number(f64),
    String(String),
    Nil
}

pub enum Expr {
    Binary { left: Box<Expr>, operator: Token, right: Box<Expr>, },
    Grouping { expression: Box<Expr>, },
    Literal { value: Object },
    Unary { operator: Token, right: Box<Expr>, },
}

pub trait ExprVisitor<T> {
    fn visit(&mut self, expression: &Expr) -> T;
}
```

This is all the code, I needed for the AST currently. If I need a new expression type, I just need to add another value to the `Expr` enum. Rust has pattern matching so I can have a much simpler visitor similar to how it would be used in a functional language.

## Challenges
1.
expr → expr groups
     | IDENTIFIER
     | NUMBER

groups → group
       | group groups

group → "(" exprs ")"
      | "(" ")"
      | "." IDENTIFIER
    
exprs → expr
      | expr, exprs

I think this is it. Names were arbitrary, I think this grammar encodes a chain of calling methods or accessing fields of expressions.

2. This challenge ended up making me forget about the book for a long time because it made me want to relearn Haskell and also ended up watching a few videos on talks about Haskell. The only thing I could think was to have some sort of record keeping function pointers, which I checked is what the author wrote as the solution for this challenge. I'm a bit biased towards liking functional programming more, so I couldn't really understand this one well. 
