import {z} from 'zod';
import {
    translateBirthdayPageSchema,
    translateMainPageSchema,
 } from "./pages";

import {typesEventsList} from "../../shared/types/libraries";

const translateHeaderSchema = z.object({
    phone: z.object({
        url: z.string(),
        title: z.string(),
    }),
    menu: z.array(
        z.object({
            title: z.string(),
            url: z.string(),
        })
    ),
    bookButtonTitle: z.string(),
})

const translateFooterSchema = z.object({
    privacy: z.object({
        title: z.string(),
        url: z.string(),
    }),
    useTerms: z.object({
        title: z.string(),
        url: z.string(),
    }),
    sections: z.array(z.object({
        heading: z.string(),
        linksList: z.array(z.object({
            title: z.string(),
            url: z.string(),
        })),
    })),
})

const translateModalBookingSchema = z.object({
    heading: z.string(),
    subheading: z.string(),
    event: z.object({
        title: z.string(),
        name: z.string(),
        list: z.array(z.object({
            title: z.string(),
            value: z.enum(typesEventsList),
        })),
    }),
    pizzeria: z.object({
        title: z.string(),
        name: z.string(),
        list: z.array(z.object({
            title: z.string(),
            value: z.string(),
        })),
    }),
    personal: z.object({
        title: z.string(),
        name: z.object({
            name: z.string(),
            placeholder: z.string(),
        }),
        phone: z.object({
            name: z.string(),
            placeholder: z.string(),
            phoneCode: z.string(),
        }),
    }),
    date: z.object({
        title: z.string(),
        description: z.string(),
    }),
    child: z.object({
        counterTitle: z.string(),
        childTitle: z.string(),
        name: z.object({
            name: z.string(),
            placeholder: z.string(),
        }),
        age: z.object({
            name: z.string(),
            placeholder: z.string(),
        }),
        allergyCheckboxTitle: z.string(),
        allergy: z.object({
            name: z.string(),
            placeholder: z.string(),
        }),
        deleteButtonTitle: z.string(),
    }),
    details: z.object({
        placeholder: z.string(),
        caps: z.object({
            charsStart: z.string(),
            charsEnd: z.string(),
        }),
    }),
    privacyPolicy: z.object({
        title: z.string(),
        url: z.string(),
    }),
    promotionAgreement: z.object({
        title: z.string(),
        url: z.string(),
    }),
    bookButtonTitle: z.string(),
    screen: z.object({
        success: z.object({
            heading: z.string(),
            subheading: z.string(),
            returnButtonTitle: z.string(),
        }),
        error: z.object({
            heading: z.string(),
            subheading: z.string(),
            returnButtonTitle: z.string(),
        }),
    }),

});

// REFACTOR: make some refactor
const translateSchema = z.object({
    header: translateHeaderSchema,
    footer: translateFooterSchema,
    modalBooking: translateModalBookingSchema,
    pages: z.object({
        main: translateMainPageSchema,
        birthday: translateBirthdayPageSchema,
    })
})


export {
    translateSchema,
};
