import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import PostsList from './PostsList';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100%",
        padding: "1em",
        backgroundColor: theme.palette.grey[50],
    }
}));

function Blog() {

    const classes = useStyles();

    return (
        <main className={classes.root}>
            <Header></Header>
            <PostsList></PostsList>
        </main>
    );
}
export default Blog;