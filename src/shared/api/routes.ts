interface CityRoutes {
    [key: string]: string;
}

interface CountryRoutes {
    [key: string]: CityRoutes;
}

export const routes: CountryRoutes = {
    azerbaijan: {
        baku: 'https://script.google.com/macros/s/AKfycbwBczD8VUcTAuitUq82-7J6Za-XNy7QHv0iuHMH3ejK-t0YMgBnQ7pSp5O6p25lWRamsA/exec'
    },
    cyprus: {
        limassol: 'https://script.google.com/macros/s/AKfycbyWeo6GqjKjHKeCUI1EEuJOFpeH_5a0LJzVkgkEU6TNsR60m6MDrdUZrliVpO_K3Inivw/exec'
    }
}
