import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ApiContext from '../../contexts/ApiContext';

import { posts } from '../../store/Posts/Posts.selectors';
import { filterPosts, removeFilters } from '../../store/Posts/Posts.actions';

function Blog() {

    const { categoria } = useParams();

    const dispatch = useDispatch();
    const postToShow = useSelector(posts);
    console.log(postToShow.allPosts);

    if(!postToShow.allPosts.lenght === 0){
        return <h2>loading...</h2>
    }

    return (
        <>
            <h1>{categoria}</h1>
            {postToShow.allPosts.map((post, index) => (
                <h2 key={index}>{post.title}</h2>
            ))}
        </>
    );
}
export default Blog;