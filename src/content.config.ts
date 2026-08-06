import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  // "cover" е URL път (напр. /uploads/blog/xxx.jpg) към файл в public/uploads/blog,
  // а не импортиран Astro asset — така Decap CMS може да качва корици директно.
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string(),
    coverAlt: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default('KRILEA'),
  }),
});

// Фаза 2 — секция "Отзиви". Колекцията е готова, но не се показва в навигацията
// или на страниците, докато не бъде активирана изрично (виж README).
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    name: z.string(),
    text: z.string(),
    rating: z.number().min(1).max(5),
    date: z.coerce.date(),
    published: z.boolean().default(false),
  }),
});

export const collections = { blog, reviews };
