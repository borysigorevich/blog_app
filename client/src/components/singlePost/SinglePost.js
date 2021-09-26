import React, {useContext, useEffect, useState} from 'react';
import './singlePost.css'
import {useLocation, useParams} from "react-router";
import axios from "axios";
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";

const SinglePost = () => {
    const PF = 'http://localhost:5000/images/'
    const [post, setPost] = useState(null)
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const {user} = useContext(Context)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false)
    // const params = useParams() better way to get params (localhost:3000/post/:postId(params))

    useEffect(() => {
        const fetchPost = async () => {
            const getPost = await axios.get(`/posts/${postId}`)
            setPost(getPost.data)
            setTitle(getPost.data.title)
            setDesc(getPost.data.desc)
        }
        fetchPost()
    }, [postId])

    const handleDelete = async () => {
        try {
            await axios.delete('/posts/' + post._id, {data: {username: user.username}})
            window.location.replace('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put('/posts/' + post._id, {
                username: user.username,
                title,
                desc
            })
            // window.location.reload()
            setUpdateMode(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={'singlePost'}>
            <div className="singlePostWrapper">
                {post?.photo && (
                    <img
                        src={PF + post.photo}
                        alt="img" className="singlePostImg"/>
                )}
                {updateMode
                    ? <input type="text" value={title}
                             className={'singlePostTitleInput'}
                             autoFocus={true}
                             onChange={(e) => setTitle(e.target.value)}/>
                    : <h1 className="singlePostTitle">
                        {title}
                        {user?.username === post?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                }
                <div className="singlePostInfo">
                    <span className={'singlePostAuthor'}>Author:
                        <Link className={'link'} to={`/?user=${post?.username}`}><b>{post?.username}</b></Link></span>
                    <span className={'singlePostDate'}>{new Date(post?.createdAt).toDateString()}</span>
                </div>
                {updateMode
                    ? <textarea className={'singlePostDescInput'} value={desc}
                                onChange={(e) => setDesc(e.target.value)}></textarea>
                    : <p className={'singlePostDesc'}>{desc}</p>}
                {updateMode && <button className={'singlePostUpdateBtn'} onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    );
};

export default SinglePost;