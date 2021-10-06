import React, { useState } from 'react';

import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { posts } from '../../../store/Posts/Posts.selectors';

import { TextField, IconButton, Button, makeStyles } from '@material-ui/core';
import { ArrowUpward as IconUP, ArrowDownward as IconDown, AddCircle } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { changeOrderDirection, disorderPosts, orderPostsBy } from '../../../store/Posts/Posts.actions';

const options = [{ label: 'Evaluation', value: 'voteScore' }, { label: 'Date', value: 'timestamp' }];

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    buttonOrder: {
        marginRight: "8px",
        padding: "8px",
    },
    buttonNewPost: {
        marginLeft: "8px",
    }
}));

function Header() {

    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();
    const blogPosts = useSelector(posts);

    function handleChangeOrderBy(e, order) {
        if (order) {
            dispatch(orderPostsBy(order));
        } else {
            dispatch(disorderPosts());
        }
    }

    function handleChangeDirection() {
        dispatch(changeOrderDirection());
    }

    function handleNewPost(e) {
        history.push("/createPost");
    }

    return (
        <main className={classes.root}>
            <IconButton
                className={classes.buttonOrder}
                onClick={handleChangeDirection}
                disabled={blogPosts.order.direction === ""}
            >
                {(blogPosts.order.direction === "UP") ? <IconUP /> : <IconDown />}
            </IconButton>
            <Autocomplete
                value={blogPosts.order.by.value}
                onChange={handleChangeOrderBy}
                id="orderBy"
                options={options}
                getOptionLabel={(option) => blogPosts.order.by.label}
                getOptionSelected={(option) => option.value}
                renderOption={(option) => (
                    <React.Fragment>
                        <span>{(option.label)}</span>
                    </React.Fragment>
                )}
                style={{ width: 300 }}
                size="small"
                renderInput={(params) => <TextField {...params} label="Order By" variant="outlined" />}
            />
            <Button
                variant="contained"
                color="default"
                className={classes.buttonNewPost}
                startIcon={<AddCircle />}
                onClick={handleNewPost}
            >
                New Post
            </Button>
        </main>
    );
}

export default Header;