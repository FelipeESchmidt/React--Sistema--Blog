import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Loading from '../Loading';

import { posts } from '../../store/Posts/Posts.selectors';
import { filterPosts, unfilterPosts } from '../../store/Posts/Posts.actions';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100%",
        padding: "1em",
        backgroundColor: theme.palette.grey[50],
    }
}));

function Blog() {

    const classes = useStyles();
    const { categoria } = useParams();

    const dispatch = useDispatch();
    const blogPosts = useSelector(posts);

    useEffect(()=>{
        if(categoria !== '' && categoria !== undefined){
            dispatch(filterPosts(categoria));
        }else{
            dispatch(unfilterPosts());
        }
    }, [categoria, dispatch]);
    
    if(blogPosts.loading){
        return (
            <main className={classes.root}>
                <Header></Header>
                <Loading position="middle" padding={1}></Loading>
            </main>
        );
    }

    return (
        <main className={classes.root}>
            <Header></Header>
            {blogPosts.visiblePosts.map((post, index) => (
                <h2 key={index}>{post.title}</h2>
            ))}
        </main>
    );
}
export default Blog;