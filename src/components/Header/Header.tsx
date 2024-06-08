import DodoLogo from '~/assets/logos/logo-dodo.svg?react';
import IconPhone from '~/assets/icons/icon-phone.svg?react';

const menu = [
    {
        title: 'Master classes',
        url: '#',
    },
    {
        title: 'Birthday',
        url: '#',
    },
    {
        title: 'Reviews',
        url: '#',
    },
    {
        title: 'Schools',
        url: '#',
    },
    {
        title: 'FAQ',
        url: '#',
    },
    {
        title: 'Contact us',
        url: '#',
    },
];

interface Props {
    translate: {
        test: string;
    },
    languageList: {
        label: string;
        active: boolean
    }[]
}

const Header = ({ languageList, translate }: Props) => {
    return (
        <div className="container hidden md:block">
            <div className="flex items-center py-8 gap-8">

                <div className="w-32">
                    <DodoLogo/>
                </div>

                <nav className="flex grow">
                    <ul className="flex grow justify-between">
                        {menu.map((item, index) => (
                            <li>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex gap-4">
                    <div className="size-8">
                        <IconPhone/>
                    </div>
                    <a href="tel:+799999999">+7999999999</a>
                </div>

                <div className="flex gap-4">
                    <a
                        href="/en"
                    >en</a>
                    <a
                        href="/ru"
                    >ru</a>
                </div>

                <div>
                    <button className="p-4 bg-orange text-white rounded-full">Bookmark master class</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
