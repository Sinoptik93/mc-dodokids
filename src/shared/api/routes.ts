interface CityRoutes {
    [key: string]: string;
}

interface CountryRoutes {
    [key: string]: CityRoutes;
}

export const routes: CountryRoutes = {
    azerbaijan: {
        baku: 'https://script.google.com/macros/s/AKfycbzOGdmfZI7zUqqADWp_QS85C1_AOGJsJmJDyyZzVE5Q5q-Tesvi3n8kaRlEm72khhjuxg/exec'
    },
    cyprus: {
        limassol: 'https://script.google.com/macros/s/AKfycbyWeo6GqjKjHKeCUI1EEuJOFpeH_5a0LJzVkgkEU6TNsR60m6MDrdUZrliVpO_K3Inivw/exec'
    }
}
