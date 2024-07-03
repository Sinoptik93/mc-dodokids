import DodoLogo from '~/assets/logos/logo-dodo.svg?react';
import DodoLogoAz from '~/assets/logos/logo-dodo-az.svg?react';
import IconPhone from '~/assets/icons/icon-phone.svg?react';
import IconBurger from '~/assets/icons/icon-burger.svg?react';
import IconCross from '~/assets/icons/icon-cross.svg?react';
import { twMerge } from "tailwind-merge";
import { useState } from "react";

const logoLibrary = {
    az: <DodoLogoAz />,
    default: <DodoLogo />
};

interface Props {
    logo?: 'default' | 'az';
    translate: {
        phone: {
            url: string;
            title: string;
        },
        menu: {
            title: string;
            url: string;
        }[]
    },
    languageList: {
        label: string;
        url: string;
        active: boolean
    }[]
}

const Header = ({ languageList, translate, logo }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="bg-white z-50 fixed top-0 left-0 right-0 flex flex-col">
                <div className="container">
                    <div className="flex items-center justify-between py-2 md:py-6">

                        <div className="w-28 md:w-32 md:mr-12">
                            {
                                logoLibrary[logo ?? 'default']
                            }
                        </div>

                        <button
                            className="md:hidden flex justify-between items-center size-6"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {
                                isMenuOpen
                                    ? <IconCross />
                                    : <IconBurger />
                            }
                        </button>

                        <div className="hidden md:flex items-center grow justify-between gap-8">

                            <nav className="flex grow">
                                <ul className="flex grow justify-between">
                                    {translate.menu.map((item, index) => (
                                        <li
                                            key={item.title}
                                        >
                                            <a
                                                href={item.url}
                                            >
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="flex gap-4">
                                <div className="size-8">
                                    <IconPhone />
                                </div>
                                <a href={translate.phone.url}>{translate.phone.title}</a>
                            </div>

                            <div className="flex">
                                {
                                    languageList.map((language) => (
                                        <a
                                            key={language.label}
                                            href={language.url}
                                            className={twMerge(
                                                "px-4 py-2 rounded-full shrink-0 uppercase",
                                                language.active && 'bg-orange text-white',
                                            )}
                                        >
                                            {language.label}
                                        </a>
                                    ))
                                }
                            </div>

                            <div>
                                <button className="p-4 bg-orange text-white rounded-full">Bookmark master class</button>
                            </div>
                        </div>
                    </div>

                    {
                        isMenuOpen && (
                            <div className="bg-white flex flex-col gap-8 pb-12 pt-4">
                                <div className="flex flex-col gap-8">
                                    <nav className="">
                                        <ul className="flex flex-col gap-6">
                                            {translate.menu.map((item) => (
                                                <li
                                                    key={item.title}
                                                >
                                                    <button
                                                        type="button"
                                                        className="text-3xl text-bold"
                                                        onClick={(e) => {
                                                            console.log('click');
                                                            window.location.href = item.url;
                                                            setIsMenuOpen(false);
                                                        }}
                                                    >
                                                        {item.title}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>

                                    <div className="flex">
                                        {
                                            languageList.map((language) => (
                                                <a
                                                    key={language.label}
                                                    href={language.url}
                                                    className={twMerge(
                                                        "px-1 rounded-full shrink-0 uppercase",
                                                        language.active && 'bg-orange text-white',
                                                    )}
                                                >
                                                    {language.label}
                                                </a>
                                            ))
                                        }
                                    </div>
                                </div>

                                <button className="w-full p-4 bg-orange text-white rounded-full">Bookmark master class</button>
                            </div>
                        )
                    }
                </div>
            </div>

        </>

    );
};

export default Header;
