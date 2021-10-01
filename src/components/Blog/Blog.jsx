import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ApiContext from '../../contexts/ApiContext';

function Blog() {

    const { categoria } = useParams();

    const context = useContext(ApiContext);

    const [posts, setPosts] = useState(null);

    useEffect(()=>{
        setPosts(null);

        context.controller.getPosts(setPosts);
        
    }, [context]);

    if(!posts){
        return <h2>loading...</h2>
    }

    return (
        <>
            <h1>{categoria}</h1>
            {Object.keys(posts).map(key=>(
                <h2 key={key}>{posts[key].title}</h2>
            ))}
        </>
    );
}
export default Blog;