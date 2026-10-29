import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    h1: z.string().optional(),
    category: z.enum(['klimatizace', 'tepelna-cerpadla', 'znacky', 'provoz-a-servis']),
    keywords: z.array(z.string()).default([]),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    perex: z.string(),
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    sources: z
      .array(z.object({ title: z.string(), url: z.string().url() }))
      .default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
