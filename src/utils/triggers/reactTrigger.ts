export const createReactTrigger = <T = any>({name, detail}: { name: string; detail: T; }) => () => {
    const customEvent = new CustomEvent(name, {
        bubbles: true,
        detail,
    });

    console.log('dispatch', customEvent);
    window.dispatchEvent(customEvent);
};
