import {z} from "zod";
import {Countries, Locales, Domains} from "../../shared/types";
import {translateSchema} from "./translate";

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

export const locationSchema = z.object({
    // Formal page data
    title: z.string(),
    pageHb: z.boolean(),
    country: z.nativeEnum(Countries),
    city: z.string(),
    isDefaultLanguage: z.boolean(),
    locale: z.string(),
    localeSlug: z.nativeEnum(Locales),
    domain: z.nativeEnum(Domains),
    logo: z.enum(["az", "default"]).optional(),
    map: mapSchema,
    cities: z.array(citySchema),

    // Pages translates
    translates: translateSchema,
});
