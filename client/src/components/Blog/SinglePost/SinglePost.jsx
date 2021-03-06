import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import PostContext from '../../../contexts/PostContext';
import { store } from '../../../store/store';
import { fetchPost, changePost } from '../../../store/SinglePost/SinglePost.actions';
import { singlePost } from '../../../store/SinglePost/SinglePost.selectors';

import { makeStyles } from '@material-ui/core';

import Loading from '../../Loading';
import Post from '../Post';
import CreateComment from '../../Forms/CreateComment';
import CommentsList from './CommentsList';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        height: "auto",
        margin: "25px auto",
        boxSizing: "border-box"
    },
}));

function SinglePost() {

    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();

    const post = useSelector(singlePost);

    useEffect(() => {
        dispatch(changePost(id));
        store.dispatch(fetchPost);
    }, [id, dispatch]);

    if(post.loading || post.id === ""){
        return <Loading position="middle" padding={1}></Loading>
    }

    return (
        <div className={classes.root}>
            <PostContext.Provider value={post.content} >
                <Post isSmall={false}></Post>
            </PostContext.Provider>
            <CreateComment postId={id} />
            <CommentsList commentsList={post.comments} />
        </div>
    );
}

export default SinglePost;