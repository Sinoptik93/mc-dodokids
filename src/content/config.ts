import {defineCollection, z } from 'astro:content';

import { translateSchema } from './schemas/translate';

const locationSchema = z.object({
  title: z.string(),
  pageHb: z.boolean(),
  test: z.string(),
  translate1: z.string(),
  country: z.string(),
  locale: z.string(),
  logo: z.enum(["az", "default"]).optional(),
  cities: z.array(z.object({
    name: z.string(),
    label: z.string(),
  })),
  translates: translateSchema,
});

const locationCollection = defineCollection({
    type: 'content',
    schema: locationSchema,
})


export const collections = {
    'location': locationCollection
};
