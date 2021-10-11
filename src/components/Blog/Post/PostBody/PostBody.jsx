import React, { useContext } from 'react';

import { useHistory } from 'react-router';

import { makeStyles, Typography } from '@material-ui/core';

import PostContext from '../../../../contexts/PostContext';
import BlogContext from '../../../../contexts/BlogContext';

const useStyles = makeStyles((theme) => ({
    textsSmall: {
        padding: "1em",
        cursor: "pointer"
    },
    textsBig: {
        padding: "2em",
    },
    titleSmall: {
        minHeight: "3.8em",
        maxHeight: "3.8em",
        overflow: "hidden",
        marginBottom: "0.5em",
        color: "black",
        fontWeight: "bold",
    },
    titleBig: {
        marginBottom: "1em",
        color: "black",
        fontWeight: "bold",
    },
    bodySmall: {
        minHeight: "4.3em",
        maxHeight: "4.3em",
        overflow: "hidden",
        marginBottom: "0.5em",
        color: "black",
    },
    bodyBig: {
        marginBottom: "1em",
        color: "black",
    },
    basic: {
        color: "#888",
        fontWeight: "300"
    }
}));

function PostBody({ isSmall = true }) {

    const classes = useStyles();
    const history = useHistory();
    const post = useContext(PostContext);
    const blogHelper = useContext(BlogContext).blogHelper;

    const transformDate = blogHelper.dateTransform.bind(blogHelper);
    const limitText = blogHelper.limitText.bind(blogHelper);

    function handleClickPost() {
        history.push(`/post/${post.id}`);
    }

    return (
        <div className={(isSmall) ? classes.textsSmall : classes.textsBig} onClick={handleClickPost}>
            <Typography
                className={(isSmall) ? classes.titleSmall : classes.titleBig}
                variant="subtitle1"
            >
                {post.title}
            </Typography>
            <Typography
                className={(isSmall) ? classes.bodySmall : classes.bodyBig}
                variant="subtitle2"
            >
                {(isSmall) ? limitText(post.body, 100) : post.body}
            </Typography>
            <Typography className={classes.basic} variant="subtitle2">Posted By {post.author}</Typography>
            <Typography className={classes.basic} variant="subtitle2">{transformDate(post.timestamp)}</Typography>
        </div>
    );
}

export default PostBody;