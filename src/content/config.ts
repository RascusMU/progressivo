import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!CONTENT_MAP.md"], base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.string().default('cs'),
    image: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    description: z.string().optional(),
    lang: z.string().default('cs'),
  }),
});

const pages = defineCollection({
  type: 'content',
});

const legal = defineCollection({
  type: 'content',
});

export const collections = { services, blog, pages, legal };
