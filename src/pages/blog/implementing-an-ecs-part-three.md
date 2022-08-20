---
layout: ../../layouts/PostLayout.astro
title: Implementing an ECS - Part 3
date: 2021-12-27 16:21:27 +0000
description: Continuing on my previous post. I made my own ECS implementation. It worked, but I still wanted to revisit the articles and look for possible improvements.
---

Continuing on my previous [post](/blog/implementing-an-ecs-part-two). I made my own ECS implementation. It worked, but I still wanted to revisit the articles and look for possible improvements.

## Component Storages
A certain component type might be used so often that having a vector makes sense. Or it might be barely used that using a small hash map might be more memory efficient.

So this improvement was inspired by the Specs library and consisted of replacing each component pool with storage. 

Each storage needs to be able to insert a component for a certain entity and to retrieve it. And now we have a vector of storages.

```cpp
class IStorage {};

template <typename T> class Storage : public IStorage {
  public:
    virtual T *insert(size_t index, T value) = 0;
    virtual T *get(size_t index) = 0;
};

std::vector<IStorage *> _storages;
```

Still taking inspiration from Specs, I made three types of storage `VecStorage`, `MapStorage`and `NullStorage`. When registering a component type, you need to pass a storage for that componnet type.

### VecStorage
VecStorage uses an `std::vector` and is meant to have an element for each entity even if that entity doesn't have this component.

### MapStorage
MapStorage uses an hash map (`std::unordered_map`), it's meant to be used with less used component types, so that there's less empty space between elements. 

It's not efficient to use this with types that are used very often.

### NullStorage
NullStorage will most likely sound weird to most people. It does exactly what the name says, it doesn't store anything.

It's use is for components that don't have any data are used as tags, where all that matters is having a bit in the bitmask. 

This way there's something pretending to store components that doesn't waste memory with components that have no data.

### Example
```cpp
struct Player {};

struct Position {
    float x, y, z;
};

struct Velocity {
    float x, y, z;
};

int main() {
    World world;
    world.register_component<Player>(new NullStorage<Player>());
    world.register_component<Position>(new VecStorage<Position>());
    world.register_component<Velocity>(new MapStorage<Velocity>());

    auto player = world.create();
    world.add_component<Position>(player, (Position){0, 5, 1});
    world.add_component<Velocity>(player, (Velocity){0, 3, 1});
    world.add_component<Player>(player, (Player){});

    auto e2 = world.create();
    world.add_component<Position>(e2, (Position){0, 8, 7});

    auto e3 = world.create();
    world.add_component<Position>(e3, (Position){0, 15, 7});
    world.add_component<Velocity>(e3, (Velocity){0, 4, 1});

    auto e4 = world.create();
    world.add_component<Position>(e4, (Position){0, 12, 7});
    world.add_component<Velocity>(e4, (Velocity){0, 5, 1});

    for (auto entity : WorldView<Position, Velocity>(world)) {
        auto *pos = world.get_component<Position>(entity);
        std::cout << pos->y << std::endl;
    }

    for (auto entity : WorldView<Player, Position, Velocity>(world)) {
        auto *pos = world.get_component<Position>(entity);
        std::cout << pos->y << std::endl;
    }
}
```

## Resources
Another thing I made based on what I saw in Specs is what they call resources. Resources are data stored in the ecs that isn't tied to any entity or component. Useful for sharing data between systems.

```cpp
struct Counter {
    int count;
}

// ...
World world;
Counter *counter = world.get_resource<Counter>();
counter->count = 0;
```

## Final thoughts
Some improvements could still be made, but I think I have reached my goal.
- `VecStorage` could have a start capacity
- Other storage types can be made, for example:
    - DenseVecStorage
    - TreeMapStorage

In some stuff, memory safety isn't ensured, a storage could be freed after being passed and cause the program to attempt to use an invalid pointer.

The complete source code for this can be found [here](https://github.com/EdSwordsmith/my_ecs).
