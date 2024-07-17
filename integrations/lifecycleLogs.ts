import kleur from "kleur";
import type {AstroIntegration, HookParameters} from "astro";

const dateTimeFormat = new Intl.DateTimeFormat(['ru-RU'], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
});

const lifecycleLogs = () => {
    const hooks = [
        `astro:config:setup`,
        `astro:config:done`,
        `astro:server:setup`,
        `astro:server:start`,
        `astro:server:done`,
        `astro:build:start`,
        `astro:build:setup`,
        `astro:build:generated`,
        `astro:build:ssr`,
        `astro:build:done`,
    ] as const;

    let integration: AstroIntegration = {
        name: "astro-lifecycle-logs",
        hooks: {},
    };

    for (const hook of hooks) {
        const date = dateTimeFormat.format(new Date());

        integration.hooks[hook] = (data) => {
            if (hook === 'astro:build:done') {
                const dataHookDone = data as HookParameters<'astro:build:done'>;
                const countriesList = dataHookDone.pages.reduce<string[]>((acc, {pathname}) => {
                    const currentCountry = pathname.split("/")[0];

                    return acc.includes(currentCountry) ? acc : [...acc, currentCountry];
                }, [])

                const countriesPath = dataHookDone.pages.reduce<{
                    [country: string]: { routes?: string[] }
                }>((acc, {pathname}) => {
                    const currentCountry = pathname.split("/")[0];
                    const currentRoutes = acc[currentCountry]?.routes ?? []
                    return {
                        ...acc,
                        [currentCountry]: {
                            routes: [
                                ...currentRoutes,
                                pathname.replace(currentCountry, ''),
                            ]
                        }
                    }
                }, {});

                console.log(`${kleur.bgGreen().black(' artifacts ')}`)
                // console.log(JSON.stringify(data, null, 2));

                countriesList.forEach((country) => {
                    console.log(`${kleur.gray(date)} ${kleur
                        .bold()
                        .green("■")} ${kleur.bgBlue(country)}`);

                    if (!!countriesPath[country]?.routes) {
                        countriesPath[country].routes.forEach((route, index) => {
                            // @ts-ignore
                            const isLast = countriesPath[country].routes.length - 1 === index;

                            console.log(`${kleur.gray(date)} ${kleur
                                .bold()
                                .green(" ")}   ${kleur.blue(isLast ? '└─' : '├─')} ${kleur.gray(route)}${isLast ? `\n${kleur.gray(date)}` : ''}`);
                        })
                    }
                })

            }

            console.log(`${kleur.gray(date)} ${kleur
                .bold()
                .yellow("[lifecycle-log]")} ${kleur.green(hook)}`);
        };
    }

    return integration;
};

export {lifecycleLogs};
