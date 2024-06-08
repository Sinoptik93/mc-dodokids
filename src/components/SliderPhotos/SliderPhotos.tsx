import {twMerge} from "tailwind-merge";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';

import IconHeart from '~/assets/icons/icon-heart.svg?react'
import IconComment from '~/assets/icons/icon-comment.svg?react'
import IconMessage from '~/assets/icons/icon-message.svg?react'
import IconBookmark from '~/assets/icons/icon-bookmark.svg?react'

import 'swiper/css';
import './sliderPhotos.styles.scss'


const SliderPhotos = ({slides}: { slides: { src: string; alt: string }[] }) => {
    return (
        <div
            id="slider-photos"
            className={
                twMerge(
                    "relative min-w-full",
                    "mt-40 mb-40"
                )
            }
        >
            <div className={
                twMerge(
                    "z-0 absolute-center flex flex-col shadow-2xl shadow-neutral-300 rounded-2xl",
                    "md:rounded-4xl"
                    // "pointer-events-none"
                )
            }>
                <div className={
                    twMerge(
                        "h-16 pt-2 px-3 bg-white",
                        "flex items-center gap-4",
                        "md:h-24 md:px-6 md:rounded-t-4xl"
                    )
                }>
                    <div className="w-8 aspect-square md:w-16 rounded-full bg-orange"/>
                    <p className="text-base md:text-2xl font-black">Dodo Pizza Cyprus</p>
                </div>

                <div
                    className={
                        twMerge(
                            "size-[250px]",
                            "md:size-[500px]"
                        )
                    }
                />

                <div className={
                    twMerge(
                        "h-16 pt-2 px-3 flex items-center gap-4 bg-white rounded-b-2xl",
                        "flex justify-between text-orange",
                        "md:h-24 md:px-6 md:rounded-b-4xl"
                    )
                }>
                    <div className="flex gap-3">
                        <div className="size-5 md:size-7">
                            <IconHeart/>
                        </div>

                        <div className="size-5 md:size-7">
                            <IconComment/>
                        </div>

                        <div className="size-5 md:size-7">
                            <IconMessage/>
                        </div>
                    </div>

                    <div className="size-5 md:size-7">
                        <IconBookmark/>
                    </div>

                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation
                loop
                centeredSlides
                className="max-w-full h-[250px] md:h-[500px]"
                breakpoints={{
                    320: {
                        slidesPerView: "auto",
                    },
                    640: {
                        slidesPerView: 'auto',
                    }
                }}
            >
                {
                    slides.map((slide) => (
                        <SwiperSlide
                            className={
                                twMerge(
                                    "max-w-[250px] max-h-[250px] ",
                                    "md:max-w-[500px] md:max-h-[500px]"
                                )
                            }
                            key={slide.alt}
                        >
                            <div className="pointer-events-none">
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default SliderPhotos;
