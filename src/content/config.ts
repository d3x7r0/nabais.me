import { defineCollection, z } from 'astro:content'

const photos = defineCollection({
  schema: z.object({
    alt: z.string(),
    caption: z.string(),
    href: z.string().url().optional(),
    meta: z.object({
      camera: z.string(),
      description: z.string(),
      lens: z.string().optional(),
      location: z.string(),
      map: z.string(),
      time: z.string(),
    }),
    path: z.string().url().optional(),
  }),
  type: 'data',
})

const posts = defineCollection({
  schema: z.object({
    description: z.string().optional(),
    publishedAt: z.date(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
  }),
  type: 'content',
})

export const collections = {
  photos,
  posts,
}
