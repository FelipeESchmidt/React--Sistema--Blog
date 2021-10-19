import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createComment } from '../../../api/blog';

import BlogContext from '../../../contexts/BlogContext';

import { newMessage } from '../../../store/Alert/Alert.actions';
import { changeField, resetForms, validateField } from '../../../store/Form/Form.actions';
import { form } from '../../../store/Form/Form.selectors';
import { refreshPosts } from '../../../store/Posts/Posts.actions';
import { refreshPost } from '../../../store/SinglePost/SinglePost.actions';

import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import useForm from '../../../hooks/useForm';

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

    function change(event) {
        handleOnChange(event, formId, dispatch, changeField);
    }

    function blur(event) {
        handleBlur(event, formId, formHelper, dispatch, validateField);
    }

    return (
        <div className={classes.commentSection} >
            <Typography variant="subtitle1">Comment on Post</Typography>
            <form onSubmit={handleEnviar} >
                <div className={classes.formWrapper}>
                    <TextField
                        value={(formReducer.forms[formId].author) ? formReducer.forms[formId].author['value'] : ""}
                        onBlur={blur}
                        error={(formReducer.forms[formId].author) ? formReducer.forms[formId].author['error'] : false}
                        helperText={(formReducer.forms[formId].author) ? formReducer.forms[formId].author['errorMessage'] : ""}
                        onChange={change}
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
                        onBlur={blur}
                        error={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['error'] : false}
                        helperText={(formReducer.forms[formId].body) ? formReducer.forms[formId].body['errorMessage'] : ""}
                        onChange={change}
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