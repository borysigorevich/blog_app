import React from 'react';
import './post.css'
import {Link} from "react-router-dom";

const Post = ({post: {title, desc, username, photo, categories, createdAt, _id}}) => {
    const PF = 'http://localhost:5000/images/'

    return (
        <div className={'post'}>
            {photo && (<img
                src={PF + photo}
                alt="img" className={'postImg'}/>)}

            <div className="postInfo">
                <div className="postCategories">
                    {categories.map(category => {
                        return <span key={Date.now()} className="postCategory">{category}</span>
                    })}
                </div>
                <span className="postTitle"><Link className={'link'} to={`/post/${_id}`}>{title}</Link></span>
                <span className="postDate">{new Date(createdAt).toDateString()}</span>
            </div>
            <p className={'postDesc'}>{desc}</p>
        </div>
    );
};

export default Post;