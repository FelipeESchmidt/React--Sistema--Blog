import React from 'react';

import { Grid, makeStyles, Paper } from '@material-ui/core';

import CommentVotes from './CommentVotes';
import CommentBody from './CommentBody';
import CommentBottom from './CommentBottom';

const useStyles = makeStyles((theme) => ({
    item: {
        width: "100%"
    },
    paper: {
        display: "flex",
        width: "100%",
        height: "auto",
        boxSizing: "border-box"
    },
    comment: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}));

function Comment() {

    const classes = useStyles();

    return (
        <Grid item className={classes.item}>
            <Paper className={classes.paper}>
                <CommentVotes />
                <div className={classes.comment}>
                    <CommentBody />
                    <CommentBottom />
                </div>
            </Paper>
        </Grid>
    );
}

export default Comment;