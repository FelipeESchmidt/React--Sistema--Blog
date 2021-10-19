import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createCategory } from '../../../api/blog';

import { fetchCategories } from '../../../store/Categories/Categories.actions';
import { form } from '../../../store/Form/Form.selectors';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';

import { newMessage } from '../../../store/Alert/Alert.actions';

import BlogContext from '../../../contexts/BlogContext';

import { TextField, Button, Container, Typography } from "@material-ui/core";
import useForm from '../../../hooks/useForm';

const formId = "createCategory";
const formFields = ["name"];

function CreateCategory() {

    const dispatch = useDispatch();
    const formReducer = useSelector(form);

    const [verifyNoErrors, handleOnChange, handleBlur] = useForm();

    const formHelper = useContext(BlogContext).formHelper;

    useEffect(() => {
        dispatch(resetForms());
    }, [dispatch]);

    function handleEnviar(event) {
        event.preventDefault();
        if (errors()) {
            const category = {
                path: formHelper.createPath(formReducer.forms[formId]['name']['value'])
            }
            formFields.map(field => category[field] = formReducer.forms[formId][field]['value']);
            sendAndReset(category);
        }
    }

    function sendAndReset(category) {
        createCategory(category);
        dispatch(resetForms());
        const alert = {
            message: `Category '${category.name}' sucessfuly created!`,
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchCategories);
        }, 200);
    }

    function errors() {
        return verifyNoErrors(formReducer, formId, formFields);
    }

    function change(event) {
        handleOnChange(event, formId, dispatch, changeField);
    }

    function blur(event) {
        handleBlur(event, formId, formHelper, dispatch, validateField);
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" style={{ margin: "80px 0 20px 0" }}>Criate new category</Typography>
            <form onSubmit={handleEnviar} >
                <TextField
                    value={(formReducer.forms[formId].name) ? formReducer.forms[formId].name['value'] : ""}
                    onBlur={blur}
                    error={(formReducer.forms[formId].name) ? formReducer.forms[formId].name['error'] : false}
                    helperText={(formReducer.forms[formId].name) ? formReducer.forms[formId].name['errorMessage'] : ""}
                    onChange={change}
                    id="name"
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