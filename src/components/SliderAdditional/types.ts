export type IconsList = "guest" | "food" | "discount" | "customization";

export interface SlideAdditionalProps {
    icon: IconsList;
    title: string;
    description: string;
}

export interface SliderAdditionalProps {
    slides: SlideAdditionalProps[];
}
