import React, {useContext, useRef, useState} from 'react';
import './login.css'
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
import {LoginFailure, LoginStart, LoginSuccess} from "../../context/Actions";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameRef = useRef()
    const passwordRef = useRef()

    const {user,dispatch, isFetching} = useContext(Context)
    console.log(user)
    const handleSubmit = async (e) => {

        e.preventDefault()
        dispatch(LoginStart())
        try {
            const payload = await axios.post('/auth/login', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })

            dispatch(LoginSuccess(payload.data))
        } catch (error) {
            dispatch(LoginFailure())
        }
    }

    return (
        <div className={'login'}>
            <span className={'loginTitle'}>Login</span>
            <form className={'loginForm'} onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text"
                       className={'loginInput'}
                       placeholder={'Enter your username...'}
                       ref={usernameRef}
                    // onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input type="password"
                       className={'loginInput'}
                       placeholder={'Enter your password...'}
                       ref={passwordRef}
                    // onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginButton" disabled={isFetching}>Login</button>
            </form>
            <button className={'loginRegisterButton'}
                    type={'submit'}>
                <Link className={'link'} to={'/login'}>Register</Link></button>
        </div>
    );
};

export default Login;