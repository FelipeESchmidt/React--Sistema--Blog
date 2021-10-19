function useForm() {

    return [verifyNoErrors, handleOnChange, handleBlur];

}

function verifyNoErrors(formReducer, formId, formFields) {
    let isGood = true;
    let counter = 0;
    for (let field in formReducer.forms[formId]) {
        isGood = isGood && !formReducer.forms[formId][field]['error'];
        counter++;
    }
    isGood = isGood && (formFields.length === counter);
    return isGood;
}

function handleOnChange(event, formId, dispatch, changeField) {
    const info = {
        form: formId,
        id: event.target.id,
        value: event.target.value,
        error: false
    }
    dispatch(changeField(info));
}

function handleBlur(event, formId, formHelper, dispatch, validateField) {
    const fieldValidate = formHelper.validate(event.target.value, event.target.name);
    const info = {
        form: formId,
        id: event.target.id,
        value: event.target.value,
        error: fieldValidate.error,
        errorMessages: fieldValidate.messages
    }
    dispatch(validateField(info));
}

export default useForm;