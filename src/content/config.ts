import { z, defineCollection } from 'astro:content'

const photos = defineCollection({
  type: "data",
  schema: z.object({
    alt: z.string(),
    caption: z.string(),
    meta: z.object({
      description: z.string(),
      time: z.string(),
      camera: z.string(),
      lens: z.string().optional(),
      location: z.string(),
      map: z.string(),
    })
  })
})

export const collections ={
  photos
}
