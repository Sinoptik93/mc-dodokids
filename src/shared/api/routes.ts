interface CityRoutes {
    [key: string]: string;
}

interface CountryRoutes {
    [key: string]: CityRoutes;
}

export const routes: CountryRoutes = {
    azerbaijan: {
        baku: 'https://script.google.com/macros/s/AKfycbwtw0mu0QStxl9jVn26FQ0KjUETDKP8RYK464IfCoM9hskFmksj3MxLnN2EgTkZ_CeR/exec'
    },
    cyprus: {
        limassol: 'https://script.google.com/macros/s/AKfycbyWeo6GqjKjHKeCUI1EEuJOFpeH_5a0LJzVkgkEU6TNsR60m6MDrdUZrliVpO_K3Inivw/exec'
    }
}
