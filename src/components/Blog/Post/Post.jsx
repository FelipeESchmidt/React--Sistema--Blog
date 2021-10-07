import React from 'react';

import { Grid, makeStyles, Paper } from '@material-ui/core';

import PostVotes from './PostVotes';
import PostBody from './PostBody';
import PostBottom from './PostBottom';

const useStyles = makeStyles((theme) => ({
    paperSmall: {
        display: "flex",
        width: "350px",
        height: "250px",
        boxSizing: "border-box"
    },
    paperBig: {
        display: "flex",
        width: "100%",
        height: "100%",
        boxSizing: "border-box"
    },
    post: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }
}));

function Post({ isSmall = true }) {

    const classes = useStyles();

    return (
        <Grid item>
            <Paper className={(isSmall) ? classes.paperSmall : classes.paperBig}>
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