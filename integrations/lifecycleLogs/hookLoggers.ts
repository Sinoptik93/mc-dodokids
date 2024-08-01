import type {HookParameters} from "astro";
import kleur from "kleur";
import log from "../utils/logger";
import type {CountryType, LocalesType} from "../../src/shared/types";
import {CountriesLanguages} from "./types";
import {getEnvironmentHosts, getLocalHostUrl, getRemoteHostUrl} from "./utils";

// TODO: убрать на верхний уровень
const domainLibrary = {
    'azerbaijan': 'az',
    'cyprus': 'cy',
}

interface CountryRouteData {
    language: LocalesType,
    country: CountryType,
    domain: string;
    route: string,
}


export const logArtifactsRoutes = (data: HookParameters<'astro:build:done'>, countriesLanguages: CountriesLanguages) => {
    /**
     * Список доступных стран из contents
     */
    const countriesList = data.pages.reduce<CountryType[]>((acc, {pathname}) => {
        const currentCountry = pathname.split("/")[0] as CountryType;

        return acc.includes(currentCountry) ? acc : [...acc, currentCountry];
    }, [])


    /**
     * Доступные пути стран
     */
    const countriesPath = data.pages.reduce<{ [countryName: string]: CountryRouteData[] }>((acc, {pathname}) => {
        const currentCountry = pathname.split("/")[0] as CountryType;
        const currentLanguage = pathname.split("/")[1] as LocalesType;

        const path: CountryRouteData = {
            country: currentCountry,
            language: currentLanguage,
            domain: domainLibrary[currentCountry],
            route: pathname.replace(currentCountry, ''),
        }

        return {
            ...acc,
            [currentCountry]: [
                ...(acc[currentCountry] ?? []),
                path
            ]
        }
    }, {});


    log.heading('artifacts')

    countriesList.forEach((country) => {
        const formatedCountry = `${kleur.bold().green("■")} ${kleur.blue(country)}`;

        log.withDate(formatedCountry)

        countriesPath[country].forEach((path, index) => {
            const isLast = countriesPath[path.country].length - 1 === index;
            const formatedPath = `  ${kleur.blue(isLast ? '└─' : '├─')} ${kleur.dim(path.route.concat('.html'))}`;

            log.withDate(formatedPath)

            if (isLast) {
                log.withDate();
            }
        })
    })

    const {localHost, remoteHost} = getEnvironmentHosts();

    if (!localHost && !remoteHost) return;

    countriesList.forEach((country) => {
        const countryPaths = countriesPath[country];
        const countryLanguage = countriesLanguages[country];

        const localizedUrls = countryPaths.reduce<{localUrls: string[], remoteUrls: string[]}>((acc, countryPath) => {
            const isCountryDefaultLanguage = countryLanguage.languages.find((language) => language.locale === countryPath.language)?.isDefault;

            const trimmedPath = countryPath.route.replace(countryPath.language, '')
            const localUrl = getLocalHostUrl(countryPath.domain, {
                language: isCountryDefaultLanguage
                    ? ''
                    : countryPath.language,
            })
            const remoteUrl = getRemoteHostUrl(countryPath.domain, {
                route: trimmedPath,
                language: isCountryDefaultLanguage
                    ? ''
                    : countryPath.language,
            })

            return {
                localUrls: [
                    ...acc.localUrls,
                    localUrl,
                ],
                remoteUrls: [
                    ...acc.remoteUrls,
                    remoteUrl
                ]
            };
        }, {localUrls: [], remoteUrls: []});


        log.heading('local urls')
        localizedUrls.localUrls.forEach((url) => {
            log.withDate(kleur.blue(url));
        })

        log.heading('remote urls')
        localizedUrls.remoteUrls.forEach((url) => {
            log.withDate(kleur.blue(url));
        })
    })
}
