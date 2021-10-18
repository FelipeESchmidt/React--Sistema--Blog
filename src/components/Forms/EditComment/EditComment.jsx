import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { editComment } from '../../../api/blog';

import { store } from '../../../store/store';
import { form } from '../../../store/Form/Form.selectors';
import { singlePost } from '../../../store/SinglePost/SinglePost.selectors';
import { newMessage } from '../../../store/Alert/Alert.actions';
import { fetchPosts } from '../../../store/Posts/Posts.actions';
import { changePost, fetchPost } from '../../../store/SinglePost/SinglePost.actions';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';

import BlogContext from '../../../contexts/BlogContext';

import { Button, Container, TextField, Typography } from '@material-ui/core';

const formId = "createComment";
const formFields = ["body"];

function EditComment() {

    const dispatch = useDispatch();
    const { postId, commentId } = useParams();
    const formReducer = useSelector(form);
    const post = useSelector(singlePost);

    const formHelper = useContext(BlogContext).formHelper;

    const [sincronized, setSincronized] = useState(false);

    useEffect(() => {
        dispatch(resetForms());
        dispatch(changePost(postId));
        store.dispatch(fetchPost);
        setSincronized(false);
    }, [dispatch, postId]);

    useEffect(() => {
        if (!sincronized && post.content.id) {
            setSincronized(true);
            const comment = post.comments.filter((currentComment) => currentComment.id === commentId)[0];
            formFields.forEach(field => {
                const info = {
                    form: formId,
                    id: field,
                    value: comment[field],
                    error: false
                }
                dispatch(changeField(info));
            });
        }
    }, [dispatch, commentId, post, sincronized]);

    function handleEnviar(event) {
        event.preventDefault();
        if (verifyNoErrors()) {
            const comment = {}
            formFields.map(field => comment[field] = formReducer.forms[formId][field]['value']);
            sendAndReset(comment);
        }
    }

    function sendAndReset(comment) {
        editComment(comment, commentId);
        dispatch(resetForms());
        const alert = {
            message: 'Comment sucessfuly edited!',
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchPost);
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

    return (
        <Container maxWidth="md">
            <Typography variant="h4" style={{ margin: "80px 0 20px 0" }}>Editing Comment</Typography>
            <form onSubmit={handleEnviar} >

                <TextField
                    value={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['value'] : ""}
                    onBlur={handleBlur}
                    error={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['error'] : false}
                    helperText={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['errorMessage'] : ""}
                    onChange={handleOnChange}
                    id="body"
                    name="text"
                    label="Comment"
                    type="text"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoComplete="off"
                />

                <Button type="submit" variant="contained" color="primary" margin="normal" >
                    Edit
                </Button>
            </form>
        </Container>
    );
}

export default EditComment;