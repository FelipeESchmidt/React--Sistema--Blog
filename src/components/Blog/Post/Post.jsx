import React from 'react';

import { Grid, makeStyles, Paper } from '@material-ui/core';

import PostVotes from './PostVotes';
import PostBody from './PostBody';
import PostBottom from './PostBottom';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        width: "350px",
        height: "250px",
        boxSizing: "border-box"
    },
    post: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}));

function Post() {

    const classes = useStyles();

    return (
        <Grid item>
            <Paper className={classes.paper}>
                <PostVotes />
                <div className={classes.post}>
                    <PostBody />
                    <PostBottom />
                </div>
            </Paper>
        </Grid>
    );
}

export default Post;