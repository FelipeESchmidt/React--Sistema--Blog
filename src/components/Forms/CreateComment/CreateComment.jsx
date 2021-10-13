import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createComment } from '../../../api/blog';

import BlogContext from '../../../contexts/BlogContext';

import { newMessage } from '../../../store/Alert/Alert.actions';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';
import { form } from '../../../store/Form/Form.selectors';
import { fetchPosts } from '../../../store/Posts/Posts.actions';
import { fetchPost } from '../../../store/SinglePost/SinglePost.actions';

import { Button, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    commentSection: {
        padding: "3em 0 1em 0",
        borderBottom: `1px solid ${theme.palette.grey[600]}`
    },
    formWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "top"
    },
    w35: {
        width: "35%",
        marginRight: "5px"
    }
}));

const formId = "createComment";
const formFields = ["author", "body"];

function CreateComment({ postId }) {

    const classes = useStyles();

    const dispatch = useDispatch();
    const formReducer = useSelector(form);

    const formHelper = useContext(BlogContext).formHelper;

    useEffect(() => {
        dispatch(resetForms());
    }, [dispatch]);

    function handleEnviar(event) {
        event.preventDefault();
        if (verifyNoErrors()) {
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
        const alert = {
            message: 'Comment sucessfuly created!',
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchPost);
            dispatch(fetchPosts);
        }, 100);
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
        <div className={classes.commentSection} >
            <Typography variant="subtitle1">Comment on Post</Typography>
            <form onSubmit={handleEnviar} >
                <div className={classes.formWrapper}>
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
                        className={classes.w35}
                        autoComplete="off"
                    />

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
                </div>

                <Button type="submit" variant="contained" color="primary" margin="normal" >
                    Comment
                </Button>
            </form>
        </div>
    );
}

export default CreateComment;