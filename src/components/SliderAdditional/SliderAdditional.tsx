import {ReactNode} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import IconCustomization from '~/assets/icons/icon-customization.svg?react'
import IconFood from '~/assets/icons/icon-food.svg?react'
import IconDiscount from '~/assets/icons/icon-discount.svg?react'
import IconGuest from '~/assets/icons/icon-guest.svg?react'

import 'swiper/css';
import 'swiper/css/pagination';
import './sliderAdditional.styles.scss'

import type {IconsList, SlideAdditionalProps, SliderAdditionalProps} from "./types";


const iconsLibrary: Record<IconsList, ReactNode> = {
    customization: <IconCustomization/>,
    discount: <IconDiscount/>,
    food: <IconFood/>,
    guest: <IconGuest/>
} as const;

const SlideAdditional = ({icon, title, description}: SlideAdditionalProps) => {
    return (
        <div className="mx-4 md:mx-0 p-8 flex flex-col gap-4 bg-white rounded-5xl md:h-[400px]">
            <div className="size-14 p-1 text-yellow-700">
                {
                    iconsLibrary[icon]
                }
            </div>

            <p className="text-yellow-700 text-2xl">{title}</p>
            <p className="text-yellow-700">{description}</p>
        </div>
    )
}

/**
 * TODO:
 * - починить HMR
 */

const SliderAdditional = ({slides}: SliderAdditionalProps) => {
    return (
        <Swiper
            modules={[Pagination]}
            pagination={{clickable: true}}
            className="max-w-full h-[450px]"
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            }}
        >
            {
                slides.map((slide) => (
                    <SwiperSlide
                        key={slide.title}
                    >
                        <SlideAdditional
                            icon={slide.icon}
                            title={slide.title}
                            description={slide.description}

                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SliderAdditional;
