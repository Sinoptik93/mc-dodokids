import {useEffect, useState} from 'react';
import {twMerge} from "tailwind-merge";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';


import {initRealisticConfetti} from "~/utils/confetti";

import {
    Modal,
    Button,
    Radio,
    Select,
    SelectItem,
    Input,
    Textarea,
    Checkbox,
    RadioGroup,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalBody,
    useRadio,
    DatePicker,
    VisuallyHidden,
    RadioProps
} from '@nextui-org/react';

import {TRIGGER_NAME} from './config'

import IconCross from '~/assets/icons/icon-cross.svg?react';
import IconTrash from '~/assets/icons/icon-trash.svg?react';
import TriangleFriendCool from '~/assets/images/friend-triangle-cool.svg?react'

import 'react-phone-input-2/lib/style.css';
import './modalBookingEvent.styles.scss'

type FormValues = {
    event: Events;
    address: string | null;
    name: string;
    phone: string;
    date: string;
    children: {
        name: string;
        age: string;
        noAllergy: boolean;
        allergyDetails?: string;
    }[];
    additionalInfo: string;
    agreePrivacy: boolean;
    agreePromotions: boolean;
};


interface RadioItem<T = string> {
    title: string;
    value: T;
}

interface RadioGroup<T = any> {
    name: string;
    list: RadioItem<T>[];
}

interface InputItem {
    name: string;
    placeholder: string;
}

interface Translate {
    heading: string;
    subheading: string;
    event: {
        title: string;
    } & RadioGroup<Events>;
    pizzeria: {
        title: string;
    } & RadioGroup;
    personal: {
        title: string;
        name: InputItem;
        phone: InputItem & { phoneCode: string; };
    };
    date: {
        title: string;
        description: string;
    };
    child: {
        counterTitle: string;
        childTitle: string;
        name: InputItem;
        age: InputItem;
        allergyCheckboxTitle: string;
        allergy: InputItem;
        deleteButtonTitle: string;
    }
    details: {
        placeholder: string;
        caps: {
            charsStart: string;
            charsEnd: string;
        };
    }
    privacyPolicy: {
        title: string;
        url: string;
    };
    promotionAgreement: {
        title: string;
        url: string;
    };
    bookEventButtonTitle: string;
    successScreen: {
        heading: string;
        subheading: string;
        returnButtonTitle: string;
    };
    errorScreen: {
        heading: string;
        subheading: string;
        returnButtonTitle: string;
    }
}


const Loader = () => {
    return (

        <div role="status">
            <svg aria-hidden="true" className="size-24 text-gray-200 animate-spin dark:text-gray-600 fill-orange"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>

    );
};

export const CustomRadio = (props: RadioProps) => {
    const {
        Component,
        children,
        isSelected,
        description,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps,
    } = useRadio(props);

    return (
        <Component
            {...getBaseProps()}
            className={twMerge(
                "group flex items-center",
                "cursor-pointer",
                "data-[selected=true]:border-orange",
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>

            <span
                {...getWrapperProps()}
            >
                <span {...getControlProps()} />
            </span>

            <div {...getLabelWrapperProps()}>
                {children && <span {...getLabelProps()}>{children}</span>}
            </div>
        </Component>
    );
};

export type Events = "pizza-mc" | "birthday" | "baking" | "schools-mc";

interface DefaultValues {
    event?: Events
}

const ModalBookingEvent = ({translates}: { translates: Translate; }) => {
    const empty = {
        event: 'pizza-mc',
        address: '',
        name: '',
        phone: '',
        date: '',
        children: [
            {
                name: '',
                age: '',
                noAllergy: false,
                allergyDetails: ''
            }
        ],
        additionalInfo: '',
        agreePrivacy: true,
        agreePromotions: false,
    }

    const test = {
        event: 'pizza-mc',
        address: null,
        name: 'Sergey',
        phone: '+79097376778',
        date: "2024-06-25",
        children: [{name: 'Anton', age: '20', noAllergy: false, allergyDetails: 'Some allergy'}],
        additionalInfo: 'Some info',
        agreePrivacy: true,
        agreePromotions: false,
    }

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isSubmitSuccessful, isSubmitting},
        getValues,
    } = useForm<FormValues>({
        defaultValues: {
            event: 'pizza-mc',
            address: '',
            name: '',
            phone: '',
            date: '',
            children: [
                {
                    name: '',
                    age: '',
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

    const {fields, append, remove} = useFieldArray({
        control,
        name: "children"
    });

    const onSubmit = async (data: FormValues) => {
        const ID_DODO =
            "AKfycbyWeo6GqjKjHKeCUI1EEuJOFpeH_5a0LJzVkgkEU6TNsR60m6MDrdUZrliVpO_K3Inivw";
        const getUrl = (id: string) => `https://script.google.com/macros/s/${id}/exec`;

        const response = await fetch(getUrl(ID_DODO), {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(data),
        });
    };

    useEffect(() => {
        const handleOpenModal = ({detail}: CustomEvent<{defaultEvent: Events;}>) => {

            console.log(detail)
            if (!!detail.defaultEvent) {
                setValue('event', detail.defaultEvent, { shouldDirty: true, shouldValidate: true, shouldTouch: true});
            }
            onOpen();
        };

        window.addEventListener(TRIGGER_NAME, handleOpenModal);

        return () => {
            window.removeEventListener(TRIGGER_NAME, handleOpenModal);
            onClose();
        }
    }, []);


    useEffect(() => {
        const fireConfetti = initRealisticConfetti();

        if (isSubmitSuccessful) {
            fireConfetti();
        }
    }, [
        isSubmitSuccessful
    ])

    const watchChildren = watch("children", []);


    return (
        <Modal
            isOpen={isOpen}
            backdrop="blur"
            closeButton={false}
            classNames={{
                backdrop: "flex items-center justify-center",
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
                                <div className={twMerge(
                                    "z-30 absolute inset-0",
                                    "bg-black bg-opacity-20 rounded-5xl",
                                    "flex justify-center items-center"
                                )}>
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
                                                        rules={{
                                                            required: true,
                                                        }}
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
                                                        render={({field}) => (
                                                            <PhoneInput
                                                                placeholder={translates.personal.phone.placeholder}
                                                                country={translates.personal.phone.phoneCode}
                                                                {...field}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>


                                            <div className="flex flex-col gap-4">
                                                <label className="">{translates.date.title}</label>
                                                {/* @ts-ignore */}
                                                <DatePicker
                                                    aria-label={translates.date.title}
                                                    variant="bordered"
                                                    isInvalid={!!errors.date}
                                                    size="lg"
                                                    minValue={today(getLocalTimeZone())}
                                                    maxValue={today(getLocalTimeZone()).add({years: 1})}
                                                    defaultValue={today(getLocalTimeZone()).add({days: 1})}
                                                    // classNames={{
                                                    //     inputWrapper: "border-2 border-neutral-200 rounded-2xl mb-2 bg-white data-[hover=true]:bg-orange-100",
                                                    //     input: "data-[selected=true]:bg-orange"
                                                    // }}
                                                    {...register('date', {
                                                        required: true,
                                                    })}
                                                />

                                                <p className="text-sm">{translates.date.description}</p>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <label className="">{translates.child.counterTitle}</label>
                                                <div className="flex gap-2 items-center mb-8">
                                                    <Button
                                                        onClick={() => remove(fields.length - 1)}
                                                        disabled={fields.length === 1}
                                                        className="min-w-5 text-orange font-black rounded-xl bg-white"
                                                    >
                                                        -
                                                    </Button>
                                                    <span>{fields.length}</span>
                                                    <Button
                                                        onClick={() =>
                                                            append({
                                                                name: '',
                                                                age: '',
                                                                noAllergy: false,
                                                                allergyDetails: ''
                                                            })
                                                        }
                                                        className="min-w-5 text-orange font-black rounded-xl bg-white"
                                                    >
                                                        +
                                                    </Button>
                                                </div>

                                                {fields.map((field, index) => (
                                                    <div key={field.id} className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <p className="pb-4">{`${translates.child.childTitle} ${index + 1}`}</p>

                                                            {
                                                                fields.length > 1 && (
                                                                    <Button
                                                                        type="button"
                                                                        className="flex items-center gap-1 text-red-600 bg-red-100 rounded-2xl px-4 py-2"
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        <div className="text-red-600  size-4">
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
                                                                variant="bordered"
                                                                isInvalid={errors.children && !!errors?.children[index]?.age}
                                                                placeholder={translates.child.name.placeholder}
                                                                {...register(`children.${index}.age`, {required: true})}
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
                                                    </div>
                                                ))}
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
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: translates.privacyPolicy.title
                                                        }}
                                                    />
                                                </Checkbox>
                                                <Checkbox
                                                    className="items-start"
                                                    {...register('agreePromotions')}
                                                >
                                                    <p
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
                                                {translates.bookEventButtonTitle}
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

                                    <p className="font-black text-4xl text-center">{translates.successScreen.heading}</p>

                                    <p className="text-neutral-600 text-center">{translates.successScreen.subheading}</p>

                                    <p className="text-neutral-600 text-center bg-neutral-200 p-4 rounded-xl">{new Date(getValues().date).toLocaleDateString('en-EN', {
                                        day: 'numeric',
                                        month: 'long'
                                    })}</p>

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
                                        {translates.successScreen.returnButtonTitle}
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
