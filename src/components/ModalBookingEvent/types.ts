import {ControllerFieldState} from "react-hook-form";
import type {Event} from '~/shared/types'
import {CalendarDate} from "@internationalized/date";

export type FormValues = {
    event: Event;
    address: string | null;
    name: string;
    phone: string;
    date: CalendarDate;
    children: {
        name: string;
        age: string;
        noAllergy: boolean;
        tempId: string;
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

export interface Translate {
    heading: string;
    subheading: string;
    event: {
        title: string;
    } & RadioGroup<Event>;
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
    bookButtonTitle: string;
    screen: {
        success: {
            heading: string;
            subheading: string;
            returnButtonTitle: string;
        };
        error: {
            heading: string;
            subheading: string;
            returnButtonTitle: string;
        }
    }
}

export interface CountryPhoneInput {
    name: string;
    regions: string[];
    iso2: string;
    countryCode: string;
    dialCode: string;
    format: string;
    priority: number;
}

export interface ValidatePhoneInputProps {
    fieldState: ControllerFieldState;
    inputNumber: string;
    country: CountryPhoneInput;
    countries: CountryPhoneInput[];
}
