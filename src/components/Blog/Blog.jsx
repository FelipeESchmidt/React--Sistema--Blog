import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { posts } from '../../store/Posts/Posts.selectors';
import { filterPosts } from '../../store/Posts/Posts.actions';

function Blog() {

    const { categoria } = useParams();

    const dispatch = useDispatch();
    const blogPosts = useSelector(posts);

    useEffect(()=>{
        if(categoria !== ''){
            dispatch(filterPosts(categoria));
        }
    }, [categoria, dispatch]);

    if(!blogPosts.allPosts.lenght === 0){
        return <h2>loading...</h2>
    }

    return (
        <>
            <h1>{categoria}</h1>
            {blogPosts.visiblePosts.map((post, index) => (
                <h2 key={index}>{post.title}</h2>
            ))}
        </>
    );
}
export default Blog;