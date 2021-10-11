import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createCategory } from '../../../api/blog';

import { fetchCategories } from '../../../store/Categories/Categories.actions';
import { form } from '../../../store/Form/Form.selectors';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';

import { newMessage } from '../../../store/Alert/Alert.actions';

import BlogContext from '../../../contexts/BlogContext';

import { TextField, Button, Container, Typography } from "@material-ui/core";

const formId = "createCategory";
const formFields = ["category"];

function CreateCategory() {

    const dispatch = useDispatch();
    const formReducer = useSelector(form);

    const formHelper = useContext(BlogContext).formHelper;

    useEffect(() => {
        dispatch(resetForms());
    }, [dispatch]);

    function handleEnviar(event) {
        event.preventDefault();
        if (verifyNoErrors()) {
            const category = {
                path: formHelper.createPath(formReducer.forms[formId]['category']['value'])
            }
            formFields.map(field => category[field] = formReducer.forms[formId][field]['value']);
            sendAndReset(category);
        }
    }

    function sendAndReset(category) {
        if (false) { /* Fazer o servidor aceitar nova categoria */
            createCategory(category);
            dispatch(fetchCategories);
        }
        const alert = {
            message: `Category '${category.category}' sucessfuly created!`,
            type: "success"
        }
        dispatch(newMessage(alert));
        dispatch(resetForms());
    }

    function verifyNoErrors() {
        let isGood = true;
        let counter = 0;
        for (let field in formReducer.forms[formId]) {
            isGood = isGood && !formReducer.forms[formId][field]['error'];
            counter++;
        }
        isGood = isGood && (formFields.length === counter);
        return isGood;
    }

    function handleOnChange(event) {
        const info = {
            form: formId,
            id: event.target.id,
            value: event.target.value,
            error: false
        }
        dispatch(changeField(info));
    }

    function handleBlur(event) {
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

    return (
        <Container maxWidth="md">
            <Typography variant="h4" style={{ margin: "80px 0 20px 0" }}>Criate new category</Typography>
            <form onSubmit={handleEnviar} >
                <TextField
                    value={(formReducer.forms[formId].category) ? formReducer.forms[formId].category['value'] : ""}
                    onBlur={handleBlur}
                    error={(formReducer.forms[formId].category) ? formReducer.forms[formId].category['error'] : false}
                    helperText={(formReducer.forms[formId].category) ? formReducer.forms[formId].category['errorMessage'] : ""}
                    onChange={handleOnChange}
                    id="category"
                    name="text"
                    label="Category"
                    type="text"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoComplete="off"
                />

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }} >
                    Create
                </Button>
            </form>
        </Container>
    );
}

export default CreateCategory;