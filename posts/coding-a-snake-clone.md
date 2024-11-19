---
title = "Coding a Snake Clone"
date = 2020-12-27T11:50:26Z
image = "/snake.png"
description = "Recently I decided to look at coding games in C with raylib, made a few experiments and then I decided to code a snake clone from scratch."
---

Recently I decided to look at coding games in C with raylib, made a few experiments and then I decided to code a snake clone from scratch. I knew that a snake could work as queue of positions. Moving a snake would be simply pushing a new position to the list and removing its tail. In order to make the snake grow all I had to do was not removing its tail if the snake encountered food.

After coding my snake clone in C, I decided to compare different ways of coding games and ended up with three versions of my snake clone:

- Snake written in C
- Snake written in C Style C++ (C++ without using classes)
- Snake written in C++

### Snake in C

```c
typedef struct SnakeNode SnakeNode;
struct SnakeNode {
    Vector2 pos;
    SnakeNode *next;
    SnakeNode *prev;
};

typedef struct {
    SnakeNode *head;
    SnakeNode *tail;
    Vector2 dir;
    bool dead;
} Snake;

Snake CreateSnake(Vector2 pos, Vector2 dir);
void PushSnakeNode(Snake *snake, Vector2 pos);
void PopSnakeNode(Snake *snake);
void UpdateSnake(Snake *snake);
void DrawSnake(const Snake *snake);
void ResetFoodPosition();
```

For the C version, I used two structs, `Snake` and `SnakeNode`. `SnakeNode` is used for the linked list nodes and `Snake` contains the linked list and other variables related to the Snake (direction if it's dead or not).

And I wrote these functions:

- `CreateSnake` - For creating the snake.
- `PushSnakeNode` - For pushing a new node to the linked list.
- `PopSnakeNode` - For removing the tail of the linked list.
- `UpdateSnake` - Contains the logic for the snake's behavior.
- `DrawSnake` - Draws the snake to the screen.
- `ResetFoodPosition` - Sets the position of the food to a random position.

### Snake in C Style C++

```cpp
struct Snake {
    std::list<Vector2> positions;
    Vector2 dir;
    bool dead;

    Snake(Vector2 pos, Vector2 dir) {
        this->positions.push_front(pos);
        this->dir = dir;
        this->dead = false;
    }
};

void UpdateSnake(Snake *snake);
void DrawSnake(const Snake *snake);
void ResetFoodPosition();
```

For the C Style C++, I removed the `SnakeNode` struct and the `PushSnakeNode`, `PopSnakeNode` functions as I used an `std::list` for keeping a linked list of positions and `CreateSnake` was replaced by the constructor of `Snake`.

### Snake in C++

```cpp
class Snake {
    std::list<Vector2> positions;
    Vector2 dir;
    bool dead;

public:
    Snake(Vector2 pos, Vector2 dir);
    void Update();
    void Draw();
};

void ResetFoodPosition();
```

For the last version, I changed the struct to a class, making the member variables private, and moved both the update and draw functions to inside the class.
