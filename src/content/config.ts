import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: ["*.md", "!CONTENT_MAP.md"], base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    description: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
});

const legal = defineCollection({
  type: 'content',
});

export const collections = { services, blog, pages, legal };
