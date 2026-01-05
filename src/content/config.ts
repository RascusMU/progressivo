import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: ["*.md", "!CONTENT_MAP.md"], base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { services };
