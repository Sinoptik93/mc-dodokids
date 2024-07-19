import {useEffect} from 'react';
import {twMerge} from "tailwind-merge";
import {getLocalTimeZone, today} from "@internationalized/date";
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import {v4 as uuidv4} from 'uuid';

import {
    Button,
    Checkbox,
    DatePicker,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Radio,
    RadioGroup,
    Textarea,
    useDisclosure,
} from '@nextui-org/react';
import {motion, AnimatePresence} from 'framer-motion';
import {Loader} from "./Loader";

import {initRealisticConfetti} from "~/shared/utils/confetti";

import {TRIGGER_NAME} from './config'

import IconCross from '~/assets/icons/icon-cross.svg?react';
import IconTrash from '~/assets/icons/icon-trash.svg?react';
import TriangleFriendCool from '~/assets/images/friend-triangle-cool.svg?react'

import 'react-phone-input-2/lib/style.css';
import './modalBookingEvent.styles.scss'


import type {
    CountryPhoneInput,
    FormValues,
    Translate,
    ValidatePhoneInputProps
} from "./types";
import {Event} from "~/shared/types";


const ModalBookingEvent = ({translates, route, locale = 'en-EN'}: { translates: Translate; locale: string; route: string}) => {
    const MAX_CHILDREN_COUNT = 10;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        getValues,
        formState: {
            errors,
            isSubmitSuccessful,
            isSubmitting
        },
    } = useForm<FormValues>({
        defaultValues: {
            event: 'pizza-mc',
            address: '',
            name: '',
            phone: '',
            date: today(getLocalTimeZone()).add({days: 1}),
            children: [
                {
                    name: '',
                    age: '',
                    tempId: uuidv4(),
                    noAllergy: false,
                    allergyDetails: ''
                }
            ],
            additionalInfo: '',
            agreePrivacy: true,
            agreePromotions: false,
        },
    });


    const additionalInfo = watch('additionalInfo')
    const eventType = watch('event')

    const watchChildren = watch("children", []);
    const {fields, append, remove} = useFieldArray({
        control,
        name: "children"
    });


    const onSubmit = async (data: FormValues) => {
        return await fetch(route, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
                ...data,
                date: data.date.toString()
            }),
        });
    };

    const handleValidatePhone = ({country, inputNumber, fieldState}: ValidatePhoneInputProps) => {
        if (!fieldState.isDirty && !fieldState.invalid) return true;
        if (inputNumber.length === 0) return false;

        const countDots = (str: string): number => {
            return (str.match(/\./g) || []).length;
        };

        const countDigits = (str: string): number => {
            return str.replace(/\D/g, '').length;
        };

        const inputDigitsCount = countDigits(inputNumber);
        const formatDigitsCount = countDots(country.format);

        const isValidNumber = inputDigitsCount === formatDigitsCount && inputNumber.startsWith(country.dialCode);

        return isValidNumber;
    }

    useEffect(() => {
        const handleOpenModal = ({detail}: CustomEvent<{ defaultEvent: Event; }>) => {

            if (!!detail.defaultEvent) {
                setValue('event', detail.defaultEvent, {shouldDirty: true, shouldValidate: true, shouldTouch: true});
            }
            onOpen();
        };

        // @ts-ignore
        window.addEventListener(TRIGGER_NAME, handleOpenModal);
    }, []);


    useEffect(() => {
        const fireConfetti = initRealisticConfetti();

        if (isSubmitSuccessful) {
            fireConfetti();
        }
    }, [
        isSubmitSuccessful
    ])

    return (
        <Modal
            isOpen={isOpen}
            backdrop="blur"
            closeButton={false}
            classNames={{
                backdrop: "flex items-center justify-center",
                wrapper: "py-6"
            }}
            onOpenChange={onOpenChange}
            className={
                twMerge(
                    "modal-booking",
                    "relative h-full px-6 overflow-visible",
                    "bg-white shadow-lg shadow-neutral-400",
                    "md:px-20 md:rounded-5xl md:max-h-[900px] md:min-w-[800px]",
                )
            }
        >
            <ModalContent className="relative">
                {(onClose) => (
                    <>
                        {
                            isSubmitting && (
                                <div
                                    className={twMerge(
                                        "z-30 absolute inset-0",
                                        "bg-black bg-opacity-20 rounded-5xl",
                                        "flex justify-center items-center"
                                    )}
                                >
                                    <Loader/>
                                </div>
                            )
                        }

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

                        {
                            !isSubmitSuccessful && (
                                <div className="mt-20 overflow-y-scroll">
                                    <ModalHeader
                                        className="sticky top-0 z-20 p-0 pb-6 flex flex-col gap-1 bg-white"
                                    >
                                        <h2 className="text-2xl md:text-4xl font-black">{translates.heading}</h2>
                                        <p className="text-base md:text-xl max-w-96">{translates.subheading}</p>
                                    </ModalHeader>

                                    <ModalBody className="p-0 pb-10">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="flex flex-col px-4 gap-8"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <label className="">{translates.event.title}</label>
                                                <div className="space-y-2">
                                                    <Controller
                                                        name="event"
                                                        control={control}
                                                        rules={{required: true}}
                                                        render={({field}) => (
                                                            <RadioGroup
                                                                aria-label={translates.event.title}
                                                                defaultValue={field.value}
                                                                onChange={field.onChange}
                                                            >
                                                                {
                                                                    translates.event.list.map((eventType) => (
                                                                        <Radio
                                                                            key={eventType.value}
                                                                            value={eventType.value}
                                                                        >
                                                                            {eventType.title}
                                                                        </Radio>
                                                                    ))
                                                                }
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            {/*<div className="flex flex-col gap-4 w-full">*/}
                                            {/*    <p>City</p>*/}
                                            {/*    <Select*/}
                                            {/*        size="lg"*/}
                                            {/*        defaultSelectedKeys={['limassol']}*/}
                                            {/*        fullWidth*/}
                                            {/*        variant="bordered"*/}
                                            {/*        placeholder="City"*/}
                                            {/*    >*/}
                                            {/*        {[{label: 'Limassol', key: 'limassol'}].map((city) => (*/}
                                            {/*            <SelectItem key={city.key}>*/}
                                            {/*                {city.label}*/}
                                            {/*            </SelectItem>*/}
                                            {/*        ))}*/}
                                            {/*    </Select>*/}
                                            {/*</div>*/}

                                            <div className="flex flex-col gap-2">
                                                <label className="">{translates.pizzeria.title}</label>
                                                <div className="space-y-2">
                                                    <Controller
                                                        name="address"
                                                        control={control}
                                                        rules={{required: true}}
                                                        defaultValue={getValues('address')}
                                                        render={({field, fieldState}) => (
                                                            <RadioGroup
                                                                aria-label={translates.pizzeria.title}
                                                                isInvalid={fieldState.invalid}
                                                                defaultValue={field.value}
                                                                onChange={field.onChange}
                                                            >
                                                                {
                                                                    translates.pizzeria.list.map((pizzeria) => (
                                                                        <Radio
                                                                            key={pizzeria.value}
                                                                            value={pizzeria.value}
                                                                        >
                                                                            {pizzeria.title}
                                                                        </Radio>
                                                                    ))
                                                                }
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 w-full">
                                                <p>{translates.personal.title}</p>
                                                <Input
                                                    isClearable
                                                    aria-label="Person name"
                                                    fullWidth
                                                    size="lg"
                                                    variant="bordered"
                                                    placeholder={translates.personal.name.placeholder}
                                                    isInvalid={!!errors.name}
                                                    {...register('name', {required: true})}
                                                />

                                                <div className="flex flex-col gap-4">
                                                    <Controller
                                                        name="phone"
                                                        control={control}
                                                        rules={{
                                                            required: true,
                                                        }}
                                                        render={({field, fieldState}) => (
                                                            <PhoneInput
                                                                placeholder={translates.personal.phone.placeholder}
                                                                country={translates.personal.phone.phoneCode}
                                                                isValid={(inputNumber, country, countries) => {
                                                                    const countryCast = country as CountryPhoneInput;
                                                                    const countriesCast = countries as CountryPhoneInput[];

                                                                    return handleValidatePhone({
                                                                        fieldState,
                                                                        inputNumber,
                                                                        country: countryCast,
                                                                        countries: countriesCast
                                                                    })
                                                                }}
                                                                autoFormat
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>


                                            <div className="flex flex-col gap-4">
                                                <label className="">{translates.date.title}</label>
                                                {/* @ts-ignore */}
                                                <Controller
                                                    name="date"
                                                    control={control}
                                                    rules={{
                                                        required: true,
                                                    }}
                                                    render={({field, fieldState}) => (
                                                        <DatePicker
                                                            aria-label={translates.date.title}
                                                            variant="bordered"
                                                            isInvalid={fieldState.invalid}
                                                            size="lg"
                                                            minValue={today(getLocalTimeZone())}
                                                            maxValue={today(getLocalTimeZone()).add({years: 1})}
                                                            defaultValue={getValues('date')}
                                                            {...field}
                                                        />
                                                    )}
                                                />

                                                <p className="text-sm">{translates.date.description}</p>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <label className="">{translates.child.counterTitle}</label>
                                                <div className="flex gap-2 items-center">
                                                    <Button
                                                        onClick={() => remove(fields.length - 1)}
                                                        disabled={fields.length === 1}
                                                        className="min-w-5 text-orange font-black rounded-xl bg-white disabled:text-orange-200"
                                                    >
                                                        -
                                                    </Button>
                                                    <span>{fields.length}</span>
                                                    <Button
                                                        disabled={fields.length === MAX_CHILDREN_COUNT}
                                                        onClick={() => {
                                                            if (fields.length === MAX_CHILDREN_COUNT) return;

                                                            append({
                                                                name: '',
                                                                age: '',
                                                                noAllergy: false,
                                                                allergyDetails: '',
                                                                tempId: uuidv4()
                                                            })
                                                        }

                                                        }
                                                        className="min-w-5 text-orange font-black rounded-xl bg-white disabled:text-orange-200"
                                                    >
                                                        +
                                                    </Button>
                                                </div>

                                                <AnimatePresence>
                                                    {eventType !== 'schools-mc' && fields.map((field, index) => (
                                                        <motion.div
                                                            key={field.tempId}
                                                            initial={{opacity: 0, maxHeight: 0}}
                                                            animate={{opacity: 1, maxHeight: '1000px'}}
                                                            exit={{opacity: 0, maxHeight: 0}}
                                                            transition={{duration: 0.3}}
                                                            className={twMerge(
                                                                "space-y-2",
                                                                fields.length - 1 === index && "mb-8"
                                                            )}
                                                        >
                                                            <div className="flex justify-between">
                                                                <p className="pb-4">{`${translates.child.childTitle} ${index + 1}`}</p>

                                                                {
                                                                    fields.length > 1 && (
                                                                        <Button
                                                                            type="button"
                                                                            className="flex items-center gap-1 text-red-600 bg-red-100 rounded-2xl px-4 py-2"
                                                                            onClick={() => remove(index)}
                                                                        >
                                                                            <div className="text-red-600 size-4">
                                                                                <IconTrash/>
                                                                            </div>

                                                                            <p>{translates.child.deleteButtonTitle}</p>
                                                                        </Button>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="flex gap-4">
                                                                {/*@ts-ignore*/}
                                                                <Input
                                                                    aria-label={translates.child.name}
                                                                    isClearable
                                                                    fullWidth
                                                                    size="lg"
                                                                    variant="bordered"
                                                                    isInvalid={errors.children && !!errors?.children[index]?.name}
                                                                    placeholder={translates.child.name.placeholder}
                                                                    {...register(`children.${index}.name`, {
                                                                        required: true
                                                                    })}
                                                                />
                                                                <Input
                                                                    aria-label={translates.child.age.name}
                                                                    isClearable
                                                                    fullWidth
                                                                    size="lg"
                                                                    type="number"
                                                                    variant="bordered"
                                                                    isInvalid={errors.children && !!errors?.children[index]?.age}
                                                                    placeholder={translates.child.age.placeholder}
                                                                    {...register(`children.${index}.age`, {
                                                                        required: true,
                                                                        min: 0,
                                                                        max: 18,
                                                                        valueAsNumber: true
                                                                    })}
                                                                />
                                                            </div>

                                                            <Checkbox
                                                                {...register(`children.${index}.noAllergy`)}
                                                            >
                                                                {translates.child.allergyCheckboxTitle}
                                                            </Checkbox>

                                                            {!watchChildren[index]?.noAllergy && (
                                                                <Textarea
                                                                    aria-label={translates.child.allergy.placeholder}
                                                                    fullWidth
                                                                    size="lg"
                                                                    variant="bordered"
                                                                    isInvalid={errors.children && !!errors?.children[index]?.allergyDetails}
                                                                    placeholder={translates.child.allergy.placeholder}
                                                                    {...register(`children.${index}.allergyDetails`, {required: true})}
                                                                />
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>

                                            <div className="flex flex-col gap-4">

                                                <div className="relative">
                                                    <Textarea
                                                        aria-label={translates.details.placeholder}
                                                        fullWidth
                                                        size="lg"
                                                        variant="bordered"
                                                        placeholder={translates.details.placeholder}
                                                        maxLength={200}
                                                        {...register('additionalInfo')}
                                                    />

                                                    <p className="text-sm text-neutral-300 absolute bottom-1 right-4">{additionalInfo.length} {translates.details.caps.charsStart} 200 {translates.details.caps.charsEnd}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <Checkbox
                                                    className="items-start mb-4"
                                                    {...register('agreePrivacy', {required: true})}
                                                >
                                                    <a
                                                        className="hover:text-orange underline underline-offset-2 transition-colors"
                                                        href={translates.privacyPolicy.url}
                                                        target="_blank"
                                                        dangerouslySetInnerHTML={{
                                                            __html: translates.privacyPolicy.title
                                                        }}
                                                    />
                                                </Checkbox>
                                                <Checkbox
                                                    className="items-start"
                                                    {...register('agreePromotions')}
                                                >
                                                    <a
                                                        className="hover:text-orange underline underline-offset-2 transition-colors"
                                                        target="_blank"
                                                        href={translates.promotionAgreement.url}
                                                        dangerouslySetInnerHTML={{
                                                            __html: translates.promotionAgreement.title
                                                        }}
                                                    />
                                                </Checkbox>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={
                                                    twMerge(
                                                        "text-base text-white text-center leading-none bg-orange",
                                                        "px-8 py-6 rounded-full",
                                                        "md:px-8 md:py-6",
                                                        "active:bg-orange disabled:bg-neutral-400 disabled:pointer-events-none",
                                                    )
                                                }
                                            >
                                                {translates.bookButtonTitle}
                                            </Button>
                                        </form>
                                    </ModalBody>
                                </div>
                            )
                        }

                        {
                            isSubmitSuccessful && (
                                <ModalBody
                                    className="px-24 py-56 flex flex-col gap-6 justify-center items-center"
                                >
                                    <div className="w-[340px]">
                                        <TriangleFriendCool/>
                                    </div>

                                    <p className="font-black text-4xl text-center">{translates.screen.success.heading}</p>

                                    <p className="text-neutral-600 text-center">{translates.screen.success.subheading}</p>

                                    <p className="text-neutral-600 text-center bg-neutral-200 p-4 rounded-xl">{
                                        new Date(getValues('date').toString()).toLocaleDateString(locale, {
                                            day: 'numeric',
                                            month: 'long'
                                        })
                                    }</p>

                                    <Button
                                        type="button"
                                        onClick={() => onClose()}
                                        className={
                                            twMerge(
                                                "text-base text-white text-center leading-none",
                                                "px-8 py-6 rounded-full",
                                                "md:px-8 md:py-6",
                                                "bg-orange hover:bg-orange-400 active:bg-orange transition-colors",
                                            )
                                        }
                                    >
                                        {translates.screen.success.returnButtonTitle}
                                    </Button>

                                </ModalBody>
                            )
                        }
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalBookingEvent;
