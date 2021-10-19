import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '../../../api/blog';

import { fetchPosts } from '../../../store/Posts/Posts.actions';
import { form } from '../../../store/Form/Form.selectors';
import { categories } from '../../../store/Categories/Categories.selector';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';

import BlogContext from '../../../contexts/BlogContext';

import { Button, Container, InputLabel, Select, FormControl, Typography } from "@material-ui/core";
import { newMessage } from '../../../store/Alert/Alert.actions';
import useForm from '../../../hooks/useForm';
import FormInput from '../FormInput';

const formId = "createPost";
const formFields = ["title", "author", "body"];
const formFieldsOptions = [{
    id: "title",
    name: "text",
    label: "Title",
    type: "text"
},{
    id: "author",
    name: "text",
    label: "Author",
    type: "text"
},{
    id: "body",
    name: "body",
    label: "Body",
    type: "text",
    multiline: true
}];

function CreatePost() {

    const dispatch = useDispatch();
    const formReducer = useSelector(form);
    const categoriesReducer = useSelector(categories);

    /*eslint no-unused-vars: "off"*/
    const [verifyNoErrors, handleOnChange, handleBlur] = useForm();

    const formHelper = useContext(BlogContext).formHelper;

    useEffect(() => {
        dispatch(resetForms());
    }, [dispatch]);

    function handleEnviar(event) {
        event.preventDefault();
        if (errors()) {
            const randomId = formHelper.createRandomId();
            const post = {
                id: randomId,
                timestamp: Date.now(),
                category: formReducer.forms[formId].category['value']
            }
            formFields.map(field => post[field] = formReducer.forms[formId][field]['value']);
            sendAndReset(post);
        }
    }

    function sendAndReset(post) {
        createPost(post);
        dispatch(resetForms());
        const alert = {
            message: 'Post sucessfuly created!',
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchPosts);
        }, 200);
    }

    function errors() {
        return verifyNoErrors(formReducer, formId, [...formFields, "category"]);
    }

    function change(event) {
        handleOnChange(event, formId, dispatch, changeField);
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" style={{ margin: "80px 0 20px 0" }}>Criate new post</Typography>
            <form onSubmit={handleEnviar} >
                
                {formFields.map((field, index) => (
                    <FormInput
                        key={index}
                        formId={formId}
                        field={field}
                        fieldProps={formFieldsOptions[index]}
                    />
                ))}

                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        native
                        value={(formReducer.forms[formId].category) ? formReducer.forms[formId].category['value'] : ""}
                        onChange={change}
                        label="Category"
                        required
                        inputProps={{
                            id: 'category',
                            name: 'select',
                        }}
                    >
                        <option aria-label="None" value="" disabled />
                        {categoriesReducer.categories.map((category, index) => <option key={index} value={category.path}>{category.name}</option>)}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }} >
                    Create
                </Button>
            </form>
        </Container>
    );
}

export default CreatePost;