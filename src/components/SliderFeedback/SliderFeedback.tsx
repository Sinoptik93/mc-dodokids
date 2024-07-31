import {twMerge} from "tailwind-merge";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import IconStar from '~/assets/icons/icon-star.svg?react'
import IconCross from '~/assets/icons/icon-cross.svg?react';

import 'swiper/css';
import 'swiper/css/pagination';
import './sliderFeedback.styles.scss'

import type {Feedback} from "./types";

import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";


const SlideFeedback = ({feedbackText, userName, date, rating}: Feedback & { onOpen?: () => void }) => {
    const MAX_CHARS_COUNT = 200;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const isLongText = feedbackText.length > MAX_CHARS_COUNT;

    return (
        <>
            <div
                className={
                    twMerge(
                        "h-[340px] flex flex-col gap-4 bg-white border-2 border-orange",
                        "p-4 rounded-2xl",
                        "md:p-8 md:rounded-5xl"
                    )
                }
            >
                <div
                    className={
                        twMerge(
                            "flex gap-2"
                        )
                    }
                >
                    {
                        [1, 2, 3, 4, 5].map((step) => (
                            <div
                                key={step}
                                className={
                                    twMerge(
                                        "w-8",
                                        (rating >= step ? "text-yellow-400" : 'text-white')
                                    )
                                }
                            >
                                <IconStar/>
                            </div>
                        ))
                    }
                </div>


                <div className="">
                    <p className="line-clamp-6">
                        {feedbackText}
                    </p>

                    {isLongText && (
                        <button
                            onClick={() => onOpen()}
                            className="text-orange"
                        >
                            Читать полностью </button>
                    )}
                </div>

                <div>
                    <p className="text-sm text-neutral-400">{userName}</p>

                    {!!date && (
                        <p className="text-sm text-neutral-400">{date.toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: "long",
                            year: 'numeric'
                        })}</p>
                    )}
                </div>

            </div>

            <Modal
                className={
                    twMerge(
                        "max-h-svh m-10 flex flex-col gap-4 bg-white border-4 border-orange overflow-visible",
                        "p-2 rounded-2xl",
                        " md:p-8 md:rounded-5xl"
                    )
                }
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>

                                <button
                                    onClick={() => onClose()}
                                    className={
                                        twMerge(
                                            "z-40 size-10  absolute right-1 top-1 p-3",
                                            "bg-white rounded-full shadow-lg shadow-neutral-400",
                                            "md:-right-2 md:-top-2 md:shadow-xl"
                                        )
                                    }
                                >
                                    <IconCross/>
                                </button>

                                <div
                                    className={
                                        twMerge(
                                            "flex gap-2"
                                        )
                                    }
                                >
                                    {
                                        [1, 2, 3, 4, 5].map((step) => (
                                            <div
                                                key={step}
                                                className={
                                                    twMerge(
                                                        "w-8",
                                                        (rating >= step ? "text-yellow-400" : 'text-white')
                                                    )
                                                }
                                            >
                                                <IconStar/>
                                            </div>
                                        ))
                                    }
                                </div>


                                <div className="h-3/4 overflow-scroll">
                                    <p className="">
                                        {feedbackText}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-neutral-400">{userName}</p>{
                                    !!date && (
                                        <p className="text-sm text-neutral-400">{
                                            date.toLocaleDateString('ru-RU', {
                                                day: 'numeric',
                                                month: "long",
                                                year: 'numeric'
                                            })
                                        }</p>
                                    )
                                }
                                </div>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

const SliderFeedback = ({feedbackList}: { feedbackList: Feedback[] }) => {
    return (
        <>
            <Swiper
                modules={[Pagination]}
                pagination={{clickable: true}}
                className="max-w-full h-[400px]"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    960: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    }
                }}
            >
                {
                    feedbackList.map(({rating, userName, date, feedbackText}, index) => (
                        <SwiperSlide
                            key={userName + index}
                        > <SlideFeedback
                            rating={rating}
                            userName={userName}
                            date={date}
                            feedbackText={feedbackText}
                        /> </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
};

export default SliderFeedback;
