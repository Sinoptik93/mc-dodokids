import { defineCollection, z } from 'astro:content';

const citiesCollection = defineCollection({
    schema: z.object({
        pageHb: z.boolean(),
        test: z.string(),
        slug: z.string()
    })
});

export const collections = {
    'city': citiesCollection
};
