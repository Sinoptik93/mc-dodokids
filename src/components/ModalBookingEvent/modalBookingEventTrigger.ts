import {createReactTrigger} from '~/shared/utils/triggers/reactTrigger'
import {TRIGGER_NAME} from './config'

// @ts-ignore
const handleClick = createReactTrigger({name: TRIGGER_NAME })

const modalButtons = document.querySelectorAll(`[data-react-trigger="${TRIGGER_NAME}"]`);

modalButtons.forEach(modalButton => {
    modalButton.addEventListener('click', handleClick);
})
