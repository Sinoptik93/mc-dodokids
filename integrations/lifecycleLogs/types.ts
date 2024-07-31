interface CountryLanguage {
    locale: string,
    isDefault: boolean
}

interface CountriesLanguages {
    [country: string]: {
        languages: CountryLanguage[]
    }
}

export type {
    CountriesLanguages
}
