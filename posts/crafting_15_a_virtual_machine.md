---
title = "Crafting Interpreters - Part 15: A Virtual Machine"
date = 2024-02-13T17:39:17Z
description = "Part 15 of following the book Crafting Interpreters in implementing interpreters for the Lox programming language."
---


> This post is based on my notes from following the [Crafting Interpreters book](https://craftinginterpreters.com/).
> The complete code and notes are available in this [repository](https://github.com/EdSwordsmith/crafting_interpreters).

This part was fun and I spent a little bit of time looking at Zig's allocators. Instead of making my own stack for the VM I used Zig's `std.ArrayList`, but since in the original code the stack was implemented using a fixed length array I used this as an excuse to try the `FixedBufferAllocator` passing it a buffer of bytes with the max size possible. The biggest different from the original is not making the VM a global variable and used Zig's error types instead of defining an enum for `InterpretResult`.

## Challenges

1. 
```
1 * 2 + 3
```

```
CONST 1
CONST 2
MULTIPLY
CONST 3 
ADD
```

```
1 + 2 * 3
```

```
CONST 1
CONST 2
CONST 3
MULTIPLY
ADD
```

```
3 - 2 - 1
```

```
CONST 3
CONST 2
SUB
CONST 1
SUB
```

```
1 + 2 * 3 - 4 / -5
```

```
CONST 1
CONST 2
CONST 3
MULTIPLY
ADD
CONST 4
CONST 5
NEGATE
DIVIDE
SUB
```

2.
```
4 - 3 * -2
```

Without OP_NEGATE:
```
CONST 4
CONST 3
CONST 0
CONST 2
SUB
MULTIPLY
SUB
```

Without OP_SUBTRACT:
```
CONST 4
CONST 3
CONST 2
NEGATE
MULTIPLY
NEGATE
ADD
```

It makes sense to have these common operations execute more efficiently with just one instruction. It probably would also make sense to have instructions for incrementing, decrementing similar to machine code instructions.

3. This challenge was really simple with my approach as I only had to use the allocator I'm using for the array lists in the Chunk for the VM's Stack instead of the fixed buffer allocator. 

The code for this challenge can be found [here](https://github.com/EdSwordsmith/crafting_interpreters/tree/15_dynamic_stack).

4. So I tried to benchmark the performance and it was actually more or less the same on my computer. Most likely the compiler already optimizes how these operations work and it ends up doing the exact same thing. I also did an optimization similar to the binary operations (except for the division due to lazyness) where only the second argument is popped from the stack.

The code for this challenge can be found [here](https://github.com/EdSwordsmith/crafting_interpreters/tree/15_opt).
