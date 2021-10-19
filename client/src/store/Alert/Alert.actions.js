import { NEW_MESSAGE, HIDE_MESSAGE } from "./Alert.types";

export function newMessage(message) {
    return {
        type: NEW_MESSAGE,
        payload: message
    }
}

export function hideMessage() {
    return {
        type: HIDE_MESSAGE,
        payload: ''
    }
}