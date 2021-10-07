import React, { useContext } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import PostContext from '../../../../contexts/PostContext';

const useStyles = makeStyles((theme) => ({
    texts: {
        padding: "1em",
    },
    title: {
        minHeight: "3.8em",
        maxHeight: "3.8em",
        overflow: "hidden",
        marginBottom: "0.5em",
        color: "black",
        fontWeight: "bold",
    },
    body: {
        minHeight: "4.3em",
        maxHeight: "4.3em",
        overflow: "hidden",
        marginBottom: "0.5em",
        color: "black",
    },
    basic: {
        color: "#888",
        fontWeight: "300"
    }
}));

function PostBody() {

    const classes = useStyles();
    const post = useContext(PostContext);

    function dateHelper(info, size) {
        let infoBetter = "0" + info;
        return infoBetter.substr(size * -1);
    }

    function dateTransform(timestamp) {
        const date = new Date(timestamp);
        const day = dateHelper(date.getDay(), 2);
        const month = dateHelper(date.getMonth(), 2);
        const year = dateHelper(date.getFullYear(), 4);
        const hours = dateHelper(date.getHours(), 2);
        const minutes = dateHelper(date.getMinutes(), 2);
        const seconds = dateHelper(date.getSeconds(), 2);
        const formatedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
        return formatedDate;
    }

    function limitText(text, limiter) {
        return text.slice(0, limiter) + (text.length > limiter ? "..." : "");
    }

    return (
        <div className={classes.texts}>
            <Typography className={classes.title} variant="subtitle1">{post.title}</Typography>
            <Typography className={classes.body} variant="subtitle2">{limitText(post.body, 100)}</Typography>
            <Typography className={classes.basic} variant="subtitle2">Posted By {post.author}</Typography>
            <Typography className={classes.basic} variant="subtitle2">{dateTransform(post.timestamp)}</Typography>
        </div>
    );
}

export default PostBody;