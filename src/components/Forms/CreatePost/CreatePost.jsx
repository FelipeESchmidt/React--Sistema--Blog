import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '../../../api/blog';

import { fetchPosts } from '../../../store/Posts/Posts.actions';
import { form } from '../../../store/Form/Form.selectors';
import { categories } from '../../../store/Categories/Categories.selector';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';

import BlogContext from '../../../contexts/BlogContext';

import { TextField, Button, Container, InputLabel, Select, FormControl } from "@material-ui/core";

const formId = "createPost";
const formFields = ["title", "body", "author", "category"];

function CreatePost() {

    const dispatch = useDispatch();
    const formReducer = useSelector(form);
    const categoriesReducer = useSelector(categories);

    const validator = useContext(BlogContext).validate;

    useEffect(() => {
        dispatch(resetForms());
    }, [dispatch]);

    function handleEnviar(event) {
        event.preventDefault();
        if (verifyNoErrors()) {
            const randomId = Math.random().toString(36).substr(2, 22) + Math.random().toString(36).substr(2, 22);
            const post = {
                id: randomId,
                timestamp: Date.now()
            }
            formFields.map(field => post[field] = formReducer.forms[formId][field]['value']);
            // createPost(post);
            // dispatch(fetchPosts);
        }
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
        const fieldValidate = validator.validate(event.target.value, event.target.name);
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
            <form onSubmit={handleEnviar} >
                <TextField
                    value={(formReducer.forms[formId].title) ? formReducer.forms[formId].title['value'] : ""}
                    onBlur={handleBlur}
                    error={(formReducer.forms[formId].title) ? formReducer.forms[formId].title['error'] : false}
                    helperText={(formReducer.forms[formId].title) ? formReducer.forms[formId].title['errorMessage'] : ""}
                    onChange={handleOnChange}
                    id="title"
                    name="text"
                    label="Title"
                    type="text"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoComplete="off"
                />

                <TextField
                    value={(formReducer.forms[formId].author) ? formReducer.forms[formId].author['value'] : ""}
                    onBlur={handleBlur}
                    error={(formReducer.forms[formId].author) ? formReducer.forms[formId].author['error'] : false}
                    helperText={(formReducer.forms[formId].author) ? formReducer.forms[formId].author['errorMessage'] : ""}
                    onChange={handleOnChange}
                    id="author"
                    name="text"
                    label="Author"
                    type="text"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoComplete="off"
                />

                <TextField
                    value={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['value'] : ""}
                    onBlur={handleBlur}
                    error={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['error'] : false}
                    helperText={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['errorMessage'] : ""}
                    onChange={handleOnChange}
                    id="body"
                    name="body"
                    label="Body"
                    type="text"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline={true}
                    autoComplete="off"
                />

                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        native
                        value={(formReducer.forms[formId].category) ? formReducer.forms[formId].category['value'] : ""}
                        onChange={handleOnChange}
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

                <Button type="submit" variant="contained" color="primary">
                    Criar
                </Button>
            </form>
        </Container>
    );
}

export default CreatePost;