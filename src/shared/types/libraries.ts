import {ValueOf} from "./utilities";

enum Locales {
    AZ = 'az',
    RU = 'ru',
    EN = 'en',
}

enum Domains {
    AZERBAIJAN = 'az',
    CYPRUS = 'cy',
}

type LocalesType = `${Locales}`;

enum Countries {
    AZERBAIJAN = "azerbaijan",
    CYPRUS = "cyprus",
}

type CountryType = `${Countries}`;

const iconsAdditionalList = ["guest", "food", "discount", "customization"] as const;
const iconsSocialNetworkList = ["instagram", "facebook", "tiktok", "phone"] as const;
const typesEventsList = ["pizza-mc", "birthday", "baking", "schools-mc"] as const;
const countryList = ["azerbaijan", "cyprus"] as const;

type AdditionalIcon = ValueOf<typeof iconsAdditionalList>;
type SocialNetworkIcon = ValueOf<typeof iconsSocialNetworkList>;
type Event = ValueOf<typeof typesEventsList>;



interface LocalesList {
    [Countries.AZERBAIJAN]: Locales.AZ | Locales.RU;
    [Countries.CYPRUS]: Locales.EN | Locales.RU;
}


export type {
    Event,
    SocialNetworkIcon,
    AdditionalIcon,
    LocalesList,
    LocalesType,
    CountryType,
};

export {
    Locales,
    Countries,
    Domains,
    countryList,
    typesEventsList,
    iconsSocialNetworkList,
    iconsAdditionalList,
};
