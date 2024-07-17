import { TRIGGER_NAME } from '~/components/ModalBookingEvent/config'

export const createReactTrigger = <T = any>({ name, detail }: { name: string; detail: T; }) => () => {
    const customEvent = new CustomEvent(name, {
        bubbles: true,
        detail,
    });

    window.dispatchEvent(customEvent);
};


export const handleModalTrigger = ({ triggerName, detail }: { triggerName: string; detail: any }) => {
    const modalButton = document.querySelector(`[data-react-trigger="${triggerName}"]`);
    const handleClick = createReactTrigger({ name: TRIGGER_NAME, detail });

    if (modalButton) {
        modalButton.addEventListener('click', handleClick);
    }

    return () => {
        if (modalButton) {
            modalButton.removeEventListener('click', handleClick)
        }
    };
};
