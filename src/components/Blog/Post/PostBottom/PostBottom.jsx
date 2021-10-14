import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { removePost } from '../../../../api/blog';

import PostContext from '../../../../contexts/PostContext';

import { fetchPosts } from '../../../../store/Posts/Posts.actions';
import { newMessage } from '../../../../store/Alert/Alert.actions';

import { Button, makeStyles, Typography, IconButton } from '@material-ui/core';
import { Comment as CommentIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    bottom: {
        display: "flex",
        justifyContent: "space-between",
        color: theme.palette.grey[800]
    },
    comments: {
        display: "flex",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        color: "inherit"
    },
    editBig: {
        width: "20%",
        color: "inherit"
    },
    editSmall: {
        width: "20%",
        color: "inherit",
        borderRadius: "0",
        padding: "0"
    },
    deleteBig: {
        width: "20%",
        color: "inherit"
    },
    deleteSmall: {
        width: "20%",
        color: "inherit",
        borderRadius: "0",
        padding: "0"
    },
    icon: {
        marginRight: "0.4em",
        fontSize: "1.2em",
        color: "inherit"
    }
}));

function PostBottom({ isSmall = true }) {

    const classes = useStyles();
    const history = useHistory();
    const post = useContext(PostContext);
    const dispatch = useDispatch();

    function handleEdit() {
        history.push(`/editPost/${post.id}`);
    }

    function handleRemove() {
        removePost(post.id);
        const alert = {
            message: `Post ${post.title} sucessfuly deleted!`,
            type: "success"
        }
        dispatch(newMessage(alert));
        setTimeout(() => {
            dispatch(fetchPosts);
        }, 200);
    }

    return (
        <div className={classes.bottom}>
            <Typography className={classes.comments} variant="subtitle1" >
                <CommentIcon className={classes.icon} />
                {post.commentCount} {(post.commentCount < 1) ? 'comment' : 'comments'}
            </Typography>

            {isSmall
                ? <IconButton
                    onClick={handleEdit}
                    className={classes.editSmall}
                >
                    <EditIcon />
                </IconButton>
                : <Button
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    className={classes.editBig}
                >
                    Edit
                </Button>
            }

            {isSmall
                ? <IconButton
                    onClick={handleRemove}
                    className={classes.deleteSmall}
                >
                    <DeleteIcon />
                </IconButton>
                : <Button
                    startIcon={<DeleteIcon />}
                    onClick={handleRemove}
                    className={classes.deleteBig}
                >
                    Delete
                </Button>
            }


        </div>
    );
}

export default PostBottom;