import { defineCollection, z } from 'astro:content';

import { translateSchema } from './schemas/translate';

import {Countries, Locales} from "~/shared/types";

const citySchema = z.object({
  name: z.string(),
  label: z.string(),
  address: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

const mapSchema = z.object({
  center: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

const locationSchema = z.object({
  // Formal page data
  title: z.string(),
  pageHb: z.boolean(),
  country: z.nativeEnum(Countries),
  locale: z.string(),
  localeSlug: z.nativeEnum(Locales),
  logo: z.enum(["az", "default"]).optional(),
  map: mapSchema,
  cities: z.array(citySchema),

  // Pages translates
  translates: translateSchema,
});

const locationCollection = defineCollection({
    type: 'content',
    schema: locationSchema,
})




const locationDataCollectionSchema = z.object({
  "link_1": z.string(),
  "link_2": z.string(),
  "config_1": z.boolean(),
  "config_2": z.boolean()
})


const locationDataCollection = defineCollection({
  type: 'data',
  schema: locationDataCollectionSchema
})

export const collections = {
  location: locationCollection,
  locationData: locationDataCollection
};
