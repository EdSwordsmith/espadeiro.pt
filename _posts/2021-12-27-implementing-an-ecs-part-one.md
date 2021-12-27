---
title: Implementing an ECS - Part 1
date: 2021-12-27 14:56:09 +0000
---

I have been tasked with implementing a simple ECS (Entity Component Systems) prototype before we start implementing one for the [CUBOS.](https://github.com/GameDevTecnico/cubos) game engine.

## What exactly is an ECS?
> Entity-Component-System (ECS) is a software architectural pattern mostly used on video game development for the storage of game world objects. An ECS follows the pattern of "entities" with "components" of data.

_Source: [wikipedia](https://en.wikipedia.org/wiki/Entity_component_system)_

To simply put:
- A component is data
- An entity is composed of components
- A system is a process that iterates over a group of entities

## The structure of an ECS
Until now my only interactions with an ECS have been using an already existing library. I knew what kind of API I wanted to have, but I had never looked into how to make it work.

What needs to be implemented:
- An entity is essentially just an index
- Components need to be stored in some way, that increases performance by taking advantage of how the cache works
- There needs to be an easy way to iterate over entities based on what components they have

## Researching
Knowing this, I began my research, looking at a few implementations and concepts that could be of interest. The following were the articles I found that helped me the most.

[https://austinmorlan.com/posts/entity_component_system/](https://austinmorlan.com/posts/entity_component_system/)

This first one showed me the basic structure that I will need, I didn't exactly like the approach for some things, such as using `typeid()`.

So, each entity has a set of bits that say which components that entity has. 

If we want to iterate over entities with a certain set of components, we use a bitmask and compare it to the entity's bitmask.

[https://csherratt.github.io/blog/posts/specs-and-legion/](https://csherratt.github.io/blog/posts/specs-and-legion/)

I had previously used both of these libraries and I knew they had different approaches when it came to how components are stored.

Specs has components organized by their type. Each component type gets some sort of container for holding the components of that type.

Legion uses something called archetypes. Components are stored based on how they are used together in entities. If two different types are used together very often they will have a container for them. 

This allowed me to think about how I want to approach storing components, to keep it simple I decided on having each component type have a vector similar to how Specs works.

[https://www.david-colson.com/2020/02/09/making-a-simple-ecs.html](https://www.david-colson.com/2020/02/09/making-a-simple-ecs.html)

Finally, this article showed me a simple implementation that caught my attention. Also used bitmasks like the previous one, but didn't use `typeid()`. Instead, it used a rather elegant solution for associating a component type to an id, a simple function with a static variable inside.

```cpp
extern int s_componentCounter;
template <class T>
int GetId()
{
  static int s_componentId = s_componentCounter++;
  return s_componentId;
}
```

This was the article I ended up deciding to follow along while making my own.
