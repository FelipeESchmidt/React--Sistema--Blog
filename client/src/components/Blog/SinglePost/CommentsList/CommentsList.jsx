import React from 'react';

import CommentContext from '../../../../contexts/CommentContext'

import { Grid, makeStyles } from '@material-ui/core';

import Comment from '../Comment';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2em 0"
    },
}));

function CommentsList({ commentsList }) {

    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            spacing={2}
            className={classes.root}
        >
            {commentsList.map(comment => {
                return (
                    <CommentContext.Provider key={comment.id} value={comment}>
                        <Comment />
                    </CommentContext.Provider>
                )
            })}
        </Grid>
    );
}

export default CommentsList;