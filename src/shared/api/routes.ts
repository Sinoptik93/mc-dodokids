interface CityRoutes {
    [key: string]: string;
}

interface CountryRoutes {
    [key: string]: CityRoutes;
}

export const routes: CountryRoutes = {
    azerbaijan: {
        baku: 'https://script.google.com/macros/s/AKfycbwJr2t9mTlWVVRM0cqM3RnpU48qX5ZKEGjzbjAnvuCw0zvjFnpyFGRw-Uu4o2Cv9jrE6A/exec'
    },
    cyprus: {
        limassol: 'https://script.google.com/macros/s/AKfycbyWeo6GqjKjHKeCUI1EEuJOFpeH_5a0LJzVkgkEU6TNsR60m6MDrdUZrliVpO_K3Inivw/exec'
    }
}
