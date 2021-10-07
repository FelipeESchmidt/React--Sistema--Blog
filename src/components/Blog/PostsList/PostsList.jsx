import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { Container, Grid } from '@material-ui/core';

import Loading from '../../Loading';
import Post from '../Post';

import PostContext from '../../../contexts/PostContext';

import { posts } from '../../../store/Posts/Posts.selectors';
import { filterPosts, unfilterPosts } from '../../../store/Posts/Posts.actions';



function PostsList() {

    const { categoria } = useParams();

    const dispatch = useDispatch();
    const blogPosts = useSelector(posts);

    useEffect(() => {
        if (categoria !== '' && categoria !== undefined) {
            dispatch(filterPosts(categoria));
        } else {
            dispatch(unfilterPosts());
        }
    }, [categoria, dispatch]);

    if (blogPosts.loading) {
        return (
            <Loading position="middle" padding={1}></Loading>
        );
    }

    return (
        <Container style={{ margin: "20px 0" }}>
            <Grid
                container
                direction="row"
                alignItems="flex-start"
                justifyContent="center"
                spacing={2}
            >
                {blogPosts.visiblePosts.map((post, index) => {
                    return (
                        <PostContext.Provider value={post} key={index} >
                            <Post />
                        </PostContext.Provider>
                    )
                })}
            </Grid>
        </Container>
    );
}

export default PostsList;