import React, { useContext } from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import BlogContext from '../../../../../contexts/BlogContext';
import CommentContext from '../../../../../contexts/CommentContext';

const useStyles = makeStyles((theme) => ({
    texts: {
        padding: "2em",
    },
    body: {
        marginBottom: "1em",
        color: "black",
    },
    basic: {
        color: "#888",
        fontWeight: "300"
    }
}));

function CommentBody() {

    const classes = useStyles();
    const comment = useContext(CommentContext);
    const blogHelper = useContext(BlogContext).blogHelper;

    const transformDate = blogHelper.dateTransform.bind(blogHelper);

    return (
        <div className={classes.texts}>
            <Typography
                className={classes.body}
                variant="subtitle2"
            >
                {comment.body}
            </Typography>
            <Typography className={classes.basic} variant="subtitle2">Commented By {comment.author}</Typography>
            <Typography className={classes.basic} variant="subtitle2">{transformDate(comment.timestamp)}</Typography>
        </div>
    );
}

export default CommentBody;