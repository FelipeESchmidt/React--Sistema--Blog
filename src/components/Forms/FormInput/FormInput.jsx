import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogContext from '../../../contexts/BlogContext';
import { form } from '../../../store/Form/Form.selectors';
import useForm from '../../../hooks/useForm';

import { TextField } from '@material-ui/core';
import { changeField, validateField } from '../../../store/Form/Form.actions';

function FormInput({ formId, field, fieldProps }) {

    const dispatch = useDispatch();

    const formReducer = useSelector(form);
    const formHelper = useContext(BlogContext).formHelper;

    /*eslint no-unused-vars: "off"*/
    const [verifyNoErrors, handleOnChange, handleBlur] = useForm();

    function change(event) {
        handleOnChange(event, formId, dispatch, changeField);
    }

    function blur(event) {
        handleBlur(event, formId, formHelper, dispatch, validateField);
    }

    return (
        <TextField
            value={(formReducer.forms[formId][field]) ? formReducer.forms[formId][field]['value'] : ""}
            onBlur={blur}
            error={(formReducer.forms[formId][field]) ? formReducer.forms[formId][field]['error'] : false}
            helperText={(formReducer.forms[formId][field]) ? formReducer.forms[formId][field]['errorMessage'] : ""}
            onChange={change}
            required
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="off"
            {...fieldProps}
        />
    );
}

export default FormInput;