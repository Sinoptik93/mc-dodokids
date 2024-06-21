export const createReactTrigger = ({name}: { name: string }) => () => {
    const customEvent = new CustomEvent(name, {
        bubbles: true
    });

    console.log('dispatch', customEvent);
    window.dispatchEvent(customEvent);
};
