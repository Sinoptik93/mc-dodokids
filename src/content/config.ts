import {defineCollection} from 'astro:content';

import {locationSchema} from './schemas';


const locationCollection = defineCollection({
    type: 'content',
    schema: locationSchema,
})

export const collections = {
    'location': locationCollection
};
