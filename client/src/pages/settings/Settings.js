import React, {useContext, useState} from 'react';
import './settings.css'
import Sidebar from "../../components/sidebar/Sidebar";
import {Context} from "../../context/Context";
import axios from "axios";
import {
    DeleteFailure,
    DeleteStart, DeleteSuccess,
    LoginSuccess,
    UpdateFailure,
    UpdateStart,
    UpdateSuccess
} from "../../context/Actions";

const Settings = () => {
    const PF = 'http://localhost:5000/images/'
    const {user, dispatch} = useContext(Context)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [profilePicture, setProfilePicture] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(UpdateStart())

        const updateInfo = {
            userId: user._id,
            username: username || user.username,
            email: email || user.email,
            profilePicture: user.profilePicture
        }

        if (password) {
            updateInfo.password = password
        }

        try {
            if (file) {
                const data = new FormData()
                const fileName = Date.now() + file.name
                data.append('name', fileName)
                data.append('file', file)
                updateInfo.profilePicture = fileName
                await axios.post('/upload', data)
            }
            const updatedUser = await axios.put('/users/' + user._id, updateInfo)
            dispatch(UpdateSuccess(updatedUser.data))
        } catch (error) {
            console.log(error)
            dispatch(UpdateFailure())
        }
    }

    const handleDelete = async () => {
        dispatch(DeleteStart())
        try {
            await axios.delete('/users/' + user._id, {
                data: {
                    userId: user._id
                }
            })
            dispatch(DeleteSuccess())
        } catch (error) {
            console.log(error)
            dispatch(DeleteFailure())
        }
    }

    return (
        <div className={'settings'}>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <span className="settingsDeleteTitle" onClick={handleDelete}>Delete your account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsProfilePicture">
                        <img
                            src={file
                                ? profilePicture
                                : (user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + 'monkey-6491669_1920.jpg')
                            }

                            // src={user.profilePicture
                            //     ? PF + user.profilePicture
                            //     : (profilePicture
                            //         ? profilePicture
                            //         : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")}
                            alt="img"/>
                        <label htmlFor="settingsFileInput">
                            <i className="settingsProfilePictureIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id={'settingsFileInput'} style={{display: 'none'}}
                               onChange={e => {
                                   setFile(e.target.files[0])
                                   setProfilePicture(URL.createObjectURL(e.target.files[0]))
                               }}/>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="text" placeholder={user.email} onChange={e => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                    <button className="settingsSubmit">Update</button>
                </form>
            </div>
            <Sidebar/>
        </div>
    )
        ;
};

export default Settings;