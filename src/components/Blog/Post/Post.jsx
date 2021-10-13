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
        boxSizing: "border-box",
        transition: "0.8s",
        "&:hover": {
            boxShadow: `0px 0px 15px -2px ${theme.palette.primary.light}`
        }
    },
    paperBig: {
        display: "flex",
        width: "100%",
        height: "100%",
        boxSizing: "border-box"
    },
    post: {
        display: "flex",
        width: "100%",
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
                    <PostBody isSmall={isSmall} />
                    <PostBottom isSmall={isSmall} />
                </div>
            </Paper>
        </Grid>
    );
}

export default Post;