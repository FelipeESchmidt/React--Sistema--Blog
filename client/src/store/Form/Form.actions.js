import { CHANGE_FIELD, RESET_FORM, VALIDATE_FIELD } from "./Form.types";

export function resetForms() {
    return {
        type: RESET_FORM,
        payload: ""
    }
}

export function changeField(fieldInfo) {
    return {
        type: CHANGE_FIELD,
        payload: fieldInfo
    }
}

export function validateField(fieldInfo) {
    return {
        type: VALIDATE_FIELD,
        payload: fieldInfo
    }
}