import {twMerge} from "tailwind-merge";

interface Props {
    title: string;
    extraClass?: string;
}

const Button = ({title, extraClass, ...rest}: Props) => {
    return (
        <button
            type="button"
            className={
                twMerge(
                    "text-base text-white text-center leading-none",
                    "px-8 py-6 rounded-full",
                    "md:px-8 md:py-6",
                    "bg-orange hover:bg-orange-400 active:bg-orange transition-colors",
                    extraClass,
                )
            }
            {...rest}
        >
            {title}
        </button>
    )
}

export default Button;


