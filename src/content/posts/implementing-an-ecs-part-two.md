---
title: Implementing an ECS - Part 2
date: 2021-12-27 15:30:00 +0000
description: Continuing on my previous post. I started making my own ECS implementation...
---

Continuing on my previous [post](/blog/implementing-an-ecs-part-one). I started making my own ECS implementation following this [article](https://www.david-colson.com/2020/02/09/making-a-simple-ecs.html).

## Component pool

The structure containing the components can be viewed as a vector of vectors, with one for each component type. Since each component type is different, a class for an array of components of a certain type was needed. Following the article, this was what I had:

```cpp
struct ComponentPool {
    char* data;
    size_t element_size;

    ComponentPool(size_t element_size) {
        this->element_size = element_size;
        this->data = new char[element_size * MAX_ENTITIES];
    }

    ~ComponentPool() {
        delete[] data;
    }

    inline void* get(size_t index) {
        return data + index * element_size;
    }
};
```

This, however, had some problems:

- Memory alignment wasn't taken into consideration
- There's a maximum number of entities

I used templates to make an easier API. There was a base class `Pool<void>` and other pools would get the element size and alignment from the type argument in the template and pass it to the constructor:

```cpp
Pool<void>::Pool(size_t size, size_t alignment, size_t capacity) {
    _size = size + size % alignment;
    _data = new uint8_t[_size * capacity];
}
```

And made a resize method, that takes the current capacity and doubles it. The capacity is stored outside the pool since it would be the same for every component pool.

```cpp
void Pool<void>::resize(size_t capacity) {
    size_t newCapacity = capacity * 2;
    uint8_t* newData = new uint8_t[_size * newCapacity];
    std::memcpy(newData, _data, _size * capacity);
    delete[] _data;
    _data = newData;
}
```

Then I just need to have the pools stored in a vector:

```cpp
std::vector<Memory::Pool<void>*> _componentPools;
```

## Entity bitmasks

The next part I had to look at was the entity bitmasks. Right now it's using `std::bitset` which forces a maximum number of component types, so an alternative was needed.

The first attempt was replacing each `std::bitset` with a `std::vector<bool>`. It worked, but every benefit of cache locality was lost and memory was being wasted storing details of the vector.

That was fixed by instead using **one** `std::vector<bool>` that holds the bitmasks for every entity. However, iterating over bits would be needed as there isn't a better way to compare masks.

So in the end the solution was using one `std::vector<uint8_t>`.

When all component type are registered, we know the number of bits needed for each entity and we get the number of bytes needed per entity. We get cache locality and we can use bitwise and for comparing masks.

## Other changes

The only other change was making sure the bitmasks vector and the component pools grew if needed when a new entity is created and the current capacity isn't enough.

The complete source code for this part can be found [here](https://github.com/EdSwordsmith/my_ecs/tree/4a9c2a98ca3b9ad8d5a1db259c245004f33fd876).
