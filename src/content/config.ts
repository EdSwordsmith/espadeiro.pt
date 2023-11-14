import { z, defineCollection } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image().optional(),
      date: z.string().transform((str) => new Date(str)),
    }),
});

export const collections = {
  posts,
};
