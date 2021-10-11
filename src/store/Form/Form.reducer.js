import { CHANGE_FIELD, RESET_FORM, VALIDATE_FIELD } from "./Form.types";

const defaultObject = {
    forms: {
        createPost: {},
        createCategory: {},
        createComment: {}
    }
}

function changeState(state, info) {
    if (!state.forms[info.form]) {
        state.forms[info.form] = {};
    }
    if (!state.forms[info.form][info.id]) {
        state.forms[info.form][info.id] = {};
    }
    state.forms[info.form][info.id]['value'] = info.value;
    state.forms[info.form][info.id]['error'] = info.error;
    return state;
}

function validateField(state, info) {
    if (!state.forms[info.form]) {
        state.forms[info.form] = {};
    }
    if (!state.forms[info.form][info.id]) {
        state.forms[info.form][info.id] = {};
    }
    state.forms[info.form][info.id]['value'] = info.value;
    state.forms[info.form][info.id]['error'] = info.error;
    state.forms[info.form][info.id]['errorMessage'] = info.errorMessages.join("\n");
    return state;
}

export default function reducer(state = defaultObject, action) {
    switch (action.type) {
        case RESET_FORM:
            return JSON.parse(JSON.stringify(defaultObject));

        case CHANGE_FIELD:
            return { ...changeState(state, action.payload) }

        case VALIDATE_FIELD:
            return { ...validateField(state, action.payload) }

        default:
            return state;
    }
}