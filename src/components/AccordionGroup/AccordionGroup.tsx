import {Accordion, AccordionItem} from "@nextui-org/react";
import IconArrow from '~/assets/icons/icon-arrow-stroke.svg?react'


interface AccordionGroupProps {
    infoList: { question: string; answer: string }[];
}

const AccordionGroup = (
    {
        infoList
    }: AccordionGroupProps) => {
    return (
        <Accordion
            className="flex flex-col gap-1"
            defaultExpandedKeys={[infoList[3].question]}
            itemClasses={{
                trigger:  'p-0',
            }}
        >
            {
                infoList.map((info, key) => (
                    <AccordionItem
                        className="p-8 rounded-3xl shadow shadow-neutral-200 text-[1.1rem]"
                        key={info.question + key}
                        aria-label={info.question}
                        title={info.question}
                        indicator={<IconArrow />}
                    >
                        <p className="text-base text-neutral-600 max-w-[700px]">
                            {info.answer}
                        </p>
                    </AccordionItem>
                ))
            }
        </Accordion>
    );
};

export default AccordionGroup;
