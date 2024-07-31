import {z} from 'zod';


import {iconsAdditionalList, iconsSocialNetworkList} from "../../../shared/types/libraries";


export const translateMainPageSchema = z.object({
    seo: z.object({
       title: z.string(),
       description: z.string(),
    }),
    hero: z.object({
        heading: z.string(),
        subheading: z.string(),
        bookButtonTitle: z.string(),
    }),
    additionalInfo: z.object({
        heading: z.object({
            base: z.string(),
            colored: z.string(),
        }),
        subheading: z.string(),
        bookButton: z.object({
            title: z.string(),
            url: z.string(),
        }),
        sliderHeading: z.string(),
        slides: z.array(z.object({
            icon: z.enum(iconsAdditionalList),
            title: z.string(),
            description: z.string(),
        })),
    }),
    summary: z.object({
        heading: z.string(),
        costBadge: z.string(),
        subtitle: z.string(),
        extra: z.object({
            description: z.string(),
            time: z.string(),
            product: z.string(),
        }),
        description: z.string(),
        formButtonTitle: z.string(),
    }),
    photoPreview: z.object({
        heading: z.string(),
        button: z.object({
            title: z.string(),
            url: z.string(),
        }),
        headingSlider: z.string(),
    }),
    feedback: z.object({
        heading: z.string(),
    }),
    pizzaPromote: z.object({
        heading: z.string(),
        orderButton: z.object({
            title: z.string(),
            url: z.string(),
        }),
    }),
    forSchools: z.object({
        heading: z.string(),
        subheading: z.string(),
        description: z.string(),
        linkTitle: z.string(),
        feedbackEmail: z.string(),
    }),
    questionAndAnswers: z.object({
        heading: z.string(),
        questions: z.array(z.object({
            question: z.string(),
            answer: z.string(),
        })),
    }),
    socialNetworks: z.object({
        heading: z.string(),
        socialNetworkList: z.array(z.object({
            type: z.enum(iconsSocialNetworkList),
            url: z.string(),
            alt: z.string(),
            title: z.string(),
        })),
    }),
});
