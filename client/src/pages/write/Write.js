import React, {useContext, useState} from 'react';
import './write.css'
import {Context} from "../../context/Context";
import axios from "axios";

const Write = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const {user} = useContext(Context)

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const newPost = {
                title,
                desc,
                username: user.username
            }
            if (file) {

                const data = new FormData()
                const filename = Date.now() + file.name
                data.append('name', filename)
                data.append('file', file)
                newPost.photo = filename
                await axios.post('/upload', data)
            }
            const savedPost = await axios.post('/posts', newPost)
            window.location.replace('/post/' + savedPost.data._id)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={'write'}>
            {file && (<img
                src={URL.createObjectURL(file)}
                alt="img" className={'writeImg'}/>)}

            <form className={'writeForm'} onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id={'fileInput'} style={{display: 'none'}}
                           onChange={(e) => setFile(e.target.files[0])}/>
                    <input type="text" placeholder={'Title'} className={'writeInput'} autoFocus={true} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder={'Tell your story'} className={'writeInput writeText'} onChange={e => setDesc(e.target.value)}>

                    </textarea>
                </div>
                <button className="writeSubmit" type={'submit'}>
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Write;