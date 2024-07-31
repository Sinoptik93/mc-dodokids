interface CityRoutes {
    [key: string]: string;
}

interface CountryRoutes {
    [key: string]: CityRoutes;
}

export const routes: CountryRoutes = {
    azerbaijan: {
        baku: 'https://script.google.com/macros/s/AKfycbzcI0FuAnTXBtb1VYOElpU-DKPTPmUD8ufWH45dO1ujytiEkAQt51IWKdJEZ6Of9y6_rA/exec'
    },
    cyprus: {
        limassol: 'https://script.google.com/macros/s/AKfycbyWeo6GqjKjHKeCUI1EEuJOFpeH_5a0LJzVkgkEU6TNsR60m6MDrdUZrliVpO_K3Inivw/exec'
    }
}
