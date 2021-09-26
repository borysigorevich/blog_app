import React from 'react';
import './posts.css'
import Post from "../post/Post";

const Posts = ({posts}) => {
    return (
        <div className={'posts'}>
            {posts?.map(post => {
                return <Post post={post} key={post._id}/>
            })}
        </div>
    );
};

export default Posts;