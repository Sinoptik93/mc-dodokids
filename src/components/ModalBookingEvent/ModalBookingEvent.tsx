import {useEffect} from 'react';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {
    Modal,
    Button,
    Radio,
    Input,
    Textarea,
    Checkbox,
    RadioGroup,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalBody,
    cn
} from '@nextui-org/react';
import PhoneInput from 'react-phone-input-2';
import IconCross from '~/assets/icons/icon-cross.svg?react';
import IconTrash from '~/assets/icons/icon-trash.svg?react';
import TriangleFriendCool from '~/assets/images/friend-triangle-cool.svg?react'

import 'react-phone-input-2/lib/style.css';
import {twMerge} from "tailwind-merge";

type FormValues = {
    event: string;
    pizzeria: string;
    name: string;
    phone: string;
    date: string;
    children: {
        name: string;
        age: string;
        allergy: boolean;
        allergyDetails?: string;
    }[];
    additionalInfo: string;
    agreePrivacy: boolean;
    agreePromotions: boolean;
};

const ModalBookingEvent = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {
        register,
        control,
        handleSubmit,
        watch,

        formState: {errors, isSubmitSuccessful, isSubmitting},
        getValues
    } = useForm<FormValues>({
        defaultValues: {
            event: 'pizza-mc',
            pizzeria: 'limasol',
            name: 'Test',
            phone: '+7777777777',
            date: '2024-06-14',
            children: [{name: 'Test', age: '20', allergy: true, allergyDetails: ''}],
            additionalInfo: 'Test',
            agreePrivacy: true,
            agreePromotions: true,
        },
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "children"
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    useEffect(() => {
        onOpen();
    }, []);

    const watchChildren = watch("children", []);

    return (
        <Modal
            isOpen={isOpen}
            backdrop="blur"
            onOpenChange={onOpenChange}
            className="relative bg-white px-6 md:px-20 md:rounded-5xl max-h-svh md:max-h-[900px] md:min-w-[800px] overflow-visible shadow-lg shadow-neutral-400"
        >
            <ModalContent className="relative">
                {(onClose) => (
                    <>
                        <button
                            onClick={() => onClose()}
                            className="z-20 absolute right-1 top-1 md:-right-2 md:-top-2 bg-white rounded-full shadow-xl shadow-neutral-400 p-3"
                        >
                            <IconCross/>
                        </button>

                        {
                            !isSubmitSuccessful && (


                                <div className="overflow-y-scroll">
                                    <ModalHeader
                                        className="z-10 p-0 pt-6 md:pt-20 pb-6 flex flex-col gap-1 sticky top-0 bg-white">
                                        <h2 className="text-2xl md:text-4xl font-black">Booking Event</h2>
                                        <p className="text-base md:text-xl max-w-96">Please leave your information and
                                            choose a
                                            suitable time
                                            to join the event.</p>
                                    </ModalHeader>

                                    <ModalBody className="p-0 pb-10">
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                                            <div className="flex flex-col gap-2">
                                                <label className="">Choose event</label>
                                                <div className="space-y-2">
                                                    <Controller
                                                        name="event"
                                                        control={control}
                                                        rules={{required: true}}
                                                        render={({field}) => (
                                                            <RadioGroup
                                                                defaultValue={field.value}
                                                                onChange={field.onChange}
                                                            >
                                                                <Radio
                                                                    value="pizza-mc"
                                                                    className={twMerge(field.value === 'pizza-mc' && 'text-orange')}
                                                                >
                                                                    Pizza making master class
                                                                </Radio>
                                                                <Radio
                                                                    value="birthday"
                                                                    className={twMerge(field.value === 'birthday' && 'text-orange')}
                                                                >
                                                                    Birthday party</Radio>
                                                                <Radio
                                                                    value="baking"
                                                                    className={twMerge(field.value === 'baking' && 'text-orange')}
                                                                >
                                                                    Baking class and birthday party</Radio>
                                                                <Radio
                                                                    value="schools-mc"
                                                                    className={twMerge(field.value === 'schools-mc' && 'text-orange')}
                                                                >
                                                                    Master class for schools</Radio>
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="">Choose a pizzeria</label>
                                                <div className="space-y-2">
                                                    <Controller
                                                        name="pizzeria"
                                                        control={control}
                                                        rules={{required: true}}
                                                        render={({field}) => (
                                                            <RadioGroup
                                                                defaultValue={field.value}
                                                                onChange={field.onChange}
                                                            >
                                                                <Radio
                                                                    value="limasol"
                                                                    className={twMerge(field.value === 'limasol' && 'text-orange')}
                                                                >
                                                                    st. Omonoias, 38, Limassol
                                                                </Radio>
                                                                <Radio
                                                                    value="address1"
                                                                    className={twMerge(field.value === 'address1' && 'text-orange')}
                                                                >
                                                                    address1
                                                                </Radio>
                                                                <Radio
                                                                    value="address2"
                                                                    className={twMerge(field.value === 'address2' && 'text-orange')}
                                                                >
                                                                    address2
                                                                </Radio>
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <p>Order person info</p>
                                                <Input
                                                    isClearable
                                                    fullWidth
                                                    color="primary"
                                                    size="md"
                                                    placeholder="Name"
                                                    isInvalid={!!errors.name}
                                                    className={
                                                        twMerge(
                                                            "border-2 border-neutral-200 rounded-2xl",
                                                            errors.name && "border-red-500"
                                                        )
                                                    }
                                                    {...register('name', {required: true})}
                                                />

                                                <div className="flex">
                                                    <Input
                                                        isClearable
                                                        fullWidth
                                                        color="primary"
                                                        size="md"
                                                        placeholder="Phone"
                                                        isInvalid={!!errors.name}
                                                        className={
                                                            twMerge(
                                                                "border-2 border-neutral-200 rounded-2xl",
                                                                errors.name && "border-red-500"
                                                            )
                                                        }
                                                        {...register('phone', {required: true})}
                                                    />

                                                    <Controller
                                                        name="phone"
                                                        control={control}
                                                        rules={{required: true}}
                                                        render={({field}) => <PhoneInput placeholder="Phone" {...field}
                                                                                         country={'cy'}/>}
                                                    />
                                                </div>
                                            </div>

                                            <div className="">
                                                <label className="">Date</label>
                                                <Input
                                                    type="date"
                                                    isClearable
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Date"
                                                    className={
                                                        twMerge(
                                                            "border-2 border-neutral-200 rounded-2xl mb-2",
                                                            errors.date && "border-red-500"
                                                        )
                                                    }
                                                    {...register('date', {required: true})}
                                                />

                                                <p className="text-sm">We will contact you within 24 hours to select the
                                                    date
                                                    and time of your visit.</p>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <label className="">Number of children</label>
                                                <div className="flex gap-2 items-center mb-8">
                                                    <Button
                                                        onClick={() => remove(fields.length - 1)}
                                                        disabled={fields.length === 0}
                                                        className="text-orange font-black rounded-xl min-w-5"
                                                    >
                                                        -
                                                    </Button>
                                                    <span>{fields.length}</span>
                                                    <Button
                                                        onClick={() =>
                                                            append({
                                                                name: '',
                                                                age: '',
                                                                allergy: false,
                                                                allergyDetails: ''
                                                            })
                                                        }
                                                        className="text-orange font-black rounded-xl min-w-5"
                                                    >
                                                        +
                                                    </Button>
                                                </div>

                                                {fields.map((field, index) => (
                                                    <div key={field.id} className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <p>{`Child ${index + 1}`}</p>

                                                            <button
                                                                type="button"
                                                                className="flex items-center gap-1 text-red-600 bg-red-100 rounded-2xl px-4 py-2"
                                                                onClick={() => remove(index)}
                                                            >
                                                                <div className="text-red-600  size-4">
                                                                    <IconTrash/>
                                                                </div>
                                                                <p>Delete card</p>
                                                            </button>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <Input
                                                                isClearable
                                                                fullWidth
                                                                color="primary"
                                                                size="lg"
                                                                placeholder="Name"
                                                                {...register(`children.${index}.name`, {required: true})}
                                                                className={
                                                                    twMerge(
                                                                        "border-2 border-neutral-200 rounded-2xl mb-2",
                                                                        errors.children?.[index]?.name && "border-red-500"
                                                                    )
                                                                }
                                                            />
                                                            <Input
                                                                isClearable
                                                                fullWidth
                                                                color="primary"
                                                                size="lg"
                                                                placeholder="Age"
                                                                {...register(`children.${index}.age`, {required: true})}
                                                                className={
                                                                    twMerge(
                                                                        "border-2 border-neutral-200 rounded-2xl mb-2",
                                                                        errors.children?.[index]?.age && "border-red-500"
                                                                    )
                                                                }
                                                            />
                                                        </div>


                                                        <Checkbox {...register(`children.${index}.allergy`)}>No
                                                            allergy</Checkbox>

                                                        {!watchChildren[index]?.allergy && (
                                                            <Textarea
                                                                fullWidth
                                                                color="primary"
                                                                size="lg"
                                                                placeholder="What allergies do you have? Write separated by commas"
                                                                {...register(`children.${index}.allergyDetails`, {required: true})}
                                                                className={
                                                                    twMerge(
                                                                        "border-2 border-neutral-200 rounded-2xl mb-2",
                                                                        errors.children?.[index]?.allergyDetails && "border-red-500"
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <label className="">Additional Information</label>
                                                <Textarea
                                                    fullWidth
                                                    color="primary"
                                                    size="lg"
                                                    placeholder="Details"
                                                    maxLength={200}
                                                    {...register('additionalInfo')}
                                                    className={
                                                        twMerge(
                                                            "border-2 border-neutral-200 rounded-2xl mb-2",
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <Checkbox {...register('agreePrivacy', {required: true})}>
                                                    I agree with the Privacy Policy
                                                </Checkbox>
                                                {errors.agreePrivacy &&
                                                    <span className="text-red-500 text-xs">This field is required</span>}
                                                <Checkbox {...register('agreePromotions')}>
                                                    I agree to receive promotional and informational communications
                                                </Checkbox>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={
                                                    twMerge(
                                                        "text-base text-white text-center leading-none",
                                                        "px-8 py-6 rounded-full",
                                                        "md:px-8 md:py-6",
                                                        "bg-orange hover:bg-orange-400 active:bg-orange transition-colors",
                                                    )
                                                }
                                            >
                                                Book event
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
                                        <TriangleFriendCool />
                                    </div>

                                    <p className="font-black text-4xl text-center">You’re awesome!</p>

                                    <p className="text-neutral-600 text-center">You have successfully registered for the Pepperoni Rush master class! We are waiting for you:</p>

                                    <p className="text-neutral-600 text-center bg-neutral-200 p-4 rounded-xl">{new Date(getValues().date).toLocaleDateString('en-EN', {day: 'numeric', month: 'long'})}</p>

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
                                        Back to main page
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
