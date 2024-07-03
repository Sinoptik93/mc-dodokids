import { z } from 'zod';

const translateSchema = z.object({
  header: z.object({
    phone: z.object({
      url: z.string(),
      title: z.string(),
    }),
    menu: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
    )
  }),
  hero: z.object({
    heading: z.string(),
    subheading: z.string(),
    formButtonTitle: z.string(),
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
      icon: z.enum(["guest", "food", "discount", "customization"]),
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
    buttonTitle: z.string(),
    headingSlider: z.string(),
  }),
  feedback: z.object({
    heading: z.string(),
  }),
  pizzaPromote: z.object({
    heading: z.string(),
    orderButtonTitle: z.string(),
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
      type: z.enum(["instagram", "facebook", "tiktok", "phone"]),
      url: z.string(),
      alt: z.string(),
      title: z.string(),
    })),
  }),
  footer: z.object({
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
  }),
  modalBooking: z.object({
    heading: z.string(),
    subheading: z.string(),
    event: z.object({
      title: z.string(),
      name: z.string(),
      list: z.array(z.object({
        title: z.string(),
        value: z.string(),
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
    bookEventButtonTitle: z.string(),
    successScreen: z.object({
      heading: z.string(),
      subheading: z.string(),
      returnButtonTitle: z.string(),
    }),
    errorScreen: z.object({
      heading: z.string(),
      subheading: z.string(),
      returnButtonTitle: z.string(),
    }),
  }),
});

export { translateSchema };
