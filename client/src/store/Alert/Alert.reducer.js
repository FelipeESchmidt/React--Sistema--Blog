import { NEW_MESSAGE, HIDE_MESSAGE } from "./Alert.types";

const defaultAlert = {
    message: "",
    type: "info",
    open: false
}

export default function reducer(state = defaultAlert, action) {
    switch (action.type) {
        case NEW_MESSAGE:
            return { ...state, message: action.payload.message, type: action.payload.type, open: true };

        case HIDE_MESSAGE:
            return { ...state, open: false };

        default:
            return state;
    }
}