import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createComment } from '../../../api/blog';

import BlogContext from '../../../contexts/BlogContext';

import { newMessage } from '../../../store/Alert/Alert.actions';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';
import { form } from '../../../store/Form/Form.selectors';
import { refreshPosts } from '../../../store/Posts/Posts.actions';
import { refreshPost } from '../../../store/SinglePost/SinglePost.actions';

import useForm from '../../../hooks/useForm';
import FormInput from '../FormInput';
import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    commentSection: {
        padding: "3em 0 1em 0",
        borderBottom: `1px solid ${theme.palette.grey[600]}`
    },
    formWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "top"
    }
}));

const formId = "createComment";
const formFields = ["author", "body"];
const formFieldsOptions = [{
    id: "author",
    name: "text",
    label: "Author",
    type: "text",
    style: { width: "35%", marginRight: "5px" }
}, {
    id: "body",
    name: "text",
    label: "Comment",
    type: "text"
}];

function CreateComment({ postId }) {

    const classes = useStyles();

    const dispatch = useDispatch();
    const formReducer = useSelector(form);

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
            const comment = {
                id: randomId,
                timestamp: Date.now(),
                parentId: postId
            }
            formFields.map(field => comment[field] = formReducer.forms[formId][field]['value']);
            sendAndReset(comment);
        }
    }

    function sendAndReset(comment) {
        createComment(comment);
        dispatch(resetForms());
        const alert = {
            message: 'Comment sucessfuly created!',
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(refreshPost);
            dispatch(refreshPosts);
        }, 200);
    }

    function errors() {
        return verifyNoErrors(formReducer, formId, formFields);
    }

    return (
        <div className={classes.commentSection} >
            <Typography variant="subtitle1">Comment on Post</Typography>
            <form onSubmit={handleEnviar} >
                <div className={classes.formWrapper}>

                    {formFields.map((field, index) => (
                        <FormInput
                            key={index}
                            formId={formId}
                            field={field}
                            fieldProps={formFieldsOptions[index]}
                        />
                    ))}
                    
                </div>

                <Button type="submit" variant="contained" color="primary" margin="normal" >
                    Comment
                </Button>
            </form>
        </div>
    );
}

export default CreateComment;