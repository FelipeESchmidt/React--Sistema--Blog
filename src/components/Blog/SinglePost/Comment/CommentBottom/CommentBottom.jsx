import React, { useContext } from 'react';

import { useHistory } from 'react-router';

import { Button, makeStyles } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import CommentContext from '../../../../../contexts/CommentContext';
import { removeComment } from '../../../../../api/blog';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../../../../store/Posts/Posts.actions';
import { fetchPost } from '../../../../../store/SinglePost/SinglePost.actions';
import { newMessage } from '../../../../../store/Alert/Alert.actions';

const useStyles = makeStyles((theme) => ({
    bottom: {
        display: "flex",
        justifyContent: "space-between",
        color: theme.palette.grey[800]
    },
    edit: {
        width: "35%",
        color: "inherit"
    },
    delete: {
        width: "35%",
        color: "inherit"
    }
}));

function CommentBottom() {

    const classes = useStyles();
    const history = useHistory();
    const comment = useContext(CommentContext);
    const dispatch = useDispatch();

    function handleEdit(){
        const postPath = history.location.pathname;
        history.push(`${postPath}/editComment/${comment.id}`);
    }

    function handleRemove() {
        removeComment(comment.id);
        const alert = {
            message: `Comment sucessfuly deleted!`,
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchPosts);
            dispatch(fetchPost);
        }, 200);
    }

    return (
        <div className={classes.bottom}>
            <Button 
                startIcon={<EditIcon />}
                onClick={handleEdit}
                className={classes.edit}
            >
                Edit
            </Button>
            <Button 
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
                className={classes.delete}
            >
                Delete
            </Button>
        </div>
    );
}

export default CommentBottom;