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
import useForm from '../../../hooks/useForm';
import FormInput from '../FormInput';

const formId = "editPost";
const formFields = ["title", "body"];
const formFieldsOptions = [{
    id: "title",
    name: "text",
    label: "Title",
    type: "text"
}, {
    id: "body",
    name: "body",
    label: "Body",
    type: "text",
    multiline: true
}];

function EditPost() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const formReducer = useSelector(form);
    const post = useSelector(singlePost);

    /*eslint no-unused-vars: "off"*/
    const [verifyNoErrors, handleOnChange, handleBlur] = useForm();

    const formHelper = useContext(BlogContext).formHelper;

    const [sincronized, setSincronized] = useState(false);

    useEffect(() => {
        dispatch(resetForms());
        dispatch(changePost(id));
        store.dispatch(fetchPost);
        setSincronized(false);
    }, [dispatch, id]);

    useEffect(() => {
        if (!sincronized && post.content.id === id) {
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
        if (errors()) {
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

    function errors() {
        return verifyNoErrors(formReducer, formId, formFields);
    }

    if (post.loading || post.id === "") {
        return <Loading position="middle" padding={1}></Loading>
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" style={{ margin: "80px 0 20px 0" }}>Editing post</Typography>
            <form onSubmit={handleEnviar} >

                {formFields.map((field, index) => (
                    <FormInput
                        key={index}
                        formId={formId}
                        field={field}
                        fieldProps={formFieldsOptions[index]}
                    />
                ))}

                <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }} >
                    Edit
                </Button>
            </form>
        </Container>
    );
}

export default EditPost;