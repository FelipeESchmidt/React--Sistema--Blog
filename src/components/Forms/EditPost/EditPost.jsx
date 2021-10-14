import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { editPost } from '../../../api/blog';

import { store } from '../../../store/store';
import { fetchPosts } from '../../../store/Posts/Posts.actions';
import { form } from '../../../store/Form/Form.selectors';
import { changePost, fetchPost } from '../../../store/SinglePost/SinglePost.actions';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';
import { newMessage } from '../../../store/Alert/Alert.actions';

import BlogContext from '../../../contexts/BlogContext';

import { TextField, Button, Container, Typography } from "@material-ui/core";
import { singlePost } from '../../../store/SinglePost/SinglePost.selectors';
import Loading from '../../Loading';

const formId = "editPost";
const formFields = ["title", "body"];

function EditPost() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const formReducer = useSelector(form);
    const post = useSelector(singlePost);

    const formHelper = useContext(BlogContext).formHelper;

    const [sincronized, setSincronized] = useState(false);

    useEffect(() => {
        dispatch(resetForms());
        dispatch(changePost(id));
        store.dispatch(fetchPost);
        setSincronized(false);
    }, [dispatch, id]);

    useEffect(() => {
        if (!sincronized && post.content.id) {
            setSincronized(true);
            formFields.forEach(field => {
                const info = {
                    form: formId,
                    id: field,
                    value: post.content[field],
                    error: false
                }
                dispatch(changeField(info));
            });
        }
    }, [dispatch, id, post, sincronized]);

    function handleEnviar(event) {
        event.preventDefault();
        if (verifyNoErrors()) {
            const editedPost = {}
            formFields.map(field => editedPost[field] = formReducer.forms[formId][field]['value']);
            sendAndReset(editedPost);
        }
    }

    function sendAndReset(editedPost) {
        editPost(editedPost, post.id);
        dispatch(resetForms());
        const alert = {
            message: 'Post sucessfuly edited!',
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchPosts);
        }, 200);
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

    if (post.loading || post.id === "") {
        return <Loading position="middle" padding={1}></Loading>
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" style={{ margin: "80px 0 20px 0" }}>Editing post</Typography>
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

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }} >
                    Edit
                </Button>
            </form>
        </Container>
    );
}

export default EditPost;