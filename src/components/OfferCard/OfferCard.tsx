import {useState} from 'react';
import {twMerge} from 'tailwind-merge';
import Button from "~/components/Button/Button.tsx";
import Arrow from '~/assets/icons/icon-arrow.svg?react'
import BalloonPopular from '~/assets/images/balloon-popular.svg?react'
import {TRIGGER_NAME} from '~/components/ModalBookingEvent/config'

interface PriceInfo {
    from: string;
    to: string;
    price: number;
}

interface Props {
    color: {
        text: string;
        accent: string;
        background: string;
        border: string;
    };
    priceList: {
        weekdays: PriceInfo;
        weekend: PriceInfo;
    }
    benefits: (string | string[])[];
    isPopular?: boolean;
}

const OfferCard = (
    {
        color,
        priceList,
        benefits,
        isPopular
    }: Props
) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={
            twMerge(
                `relative rounded-5xl py-12 px-6 border-2 flex-1`,
                color.border,
                color.background,
                color.text
            )
        }>
            {
                isPopular && (
                    <div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 flex justify-center items-center -rotate-12"
                    >
                        <p className="absolute z-10  max-w-24 leading-none text-xl text-center">
                            The most popular
                        </p>
                        <BalloonPopular
                            className="relative z-0 w-36 inset-0"
                        />
                    </div>
                )
            }

            <div className="text-center">
                <h2
                    className="mb-4 text-3xl font-black uppercase"
                >
                Junior chef
                </h2>

                <div
                    className="flex justify-around gap-2 mb-4"
                >
                    <div className="">
                        <div className="">
                            <p className={
                                twMerge(
                                    "font-black text-5xl",
                                    color.accent
                                )
                            }>
                                {priceList.weekdays.price}
                            </p>

                            <p className={
                                twMerge(
                                    "font-black text-3xl",
                                    color.accent
                                )
                            }>
                                AED/KID
                            </p>
                        </div>

                        <p className="text-2xl">
                            {priceList.weekdays.from}-{priceList.weekdays.to}
                        </p>
                    </div>

                    <div className="">
                        <div className="">
                            <p className={
                                twMerge(
                                    "font-black text-5xl",
                                    color.accent
                                )
                            }>
                                {priceList.weekend.price}
                            </p>

                            <p className={
                                twMerge(
                                    "font-black text-3xl",
                                    color.accent
                                )
                            }>
                                AED/KID
                            </p>
                        </div>

                        <p className="text-2xl">
                            {priceList.weekend.from}-{priceList.weekend.to}
                        </p>
                    </div>
                </div>

                <Button
                    title="Book Now"
                    data-react-trigger={TRIGGER_NAME}
                    extraClass="text-3xl w-full py-3"
                />

                <div
                    className={
                        twMerge(
                            'overflow-hidden transition-all duration-500 ease-in-out mb-8',
                            isExpanded
                                ? 'max-h-screen opacity-100'
                                : 'max-h-0 opacity-0 md:max-h-[1500px] md:opacity-100'
                        )
                    }
                >
                    <ul className="mt-4">
                        {
                            benefits.map((benefit) => {
                                const isInner = Array.isArray(benefit);

                                const list = isInner
                                    ? benefit
                                    : [benefit];

                                return list.map((item, index) => (
                                    <li key={item} className={
                                        twMerge(
                                            "flex mb-2 py-4",
                                            list.length - 1 === index && "border-b-2 border-stone-400"
                                        )
                                    }>
                                        <div
                                            className="mr-2 mt-1.5 border-4 size-3 border-stone-400 rounded-full shrink-0"
                                        />
                                        <span
                                            className="text-left"
                                        >
                                            {item}
                                        </span>
                                    </li>
                                ))
                            })
                        }
                    </ul>
                </div>

                <button
                    className="w-full justify-center items-center flex gap-4 text-xl text-stone-400 md:hidden"
                    onClick={
                        () => setIsExpanded(!isExpanded)
                    }
                >
                    <div className={
                        twMerge(
                            "size-6 flex items-center transition-transform duration-500 ease-in-out",
                            isExpanded
                                ? ''
                                : '-rotate-180'
                        )
                    }>
                        <Arrow/>
                    </div>

                    {
                        isExpanded
                            ? 'Hide Details'
                            : 'Show Details'
                    }

                </button>
            </div>
        </div>
    );
};

export default OfferCard;
