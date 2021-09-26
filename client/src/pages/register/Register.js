import React, {useState} from 'react';
import './register.css'
import {Link} from "react-router-dom";
import axios from "axios";


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError(false)
            const response = await axios.post('/auth/register', {
                username,
                email,
                password
            })
            response.data && window.location.replace('/login')
        } catch (error) {
            setError(true)
        }
    }

    return (
        <div className={'register'}>
            <span className={'registerTitle'}>Register</span>
            <form className={'registerForm'} onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text"
                       className={'registerInput'}
                       placeholder={'Enter your username...'}
                       onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input type="email"
                       className={'registerInput'}
                       placeholder={'Enter your email...'}
                       onChange={e => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password"
                       className={'registerInput'}
                       placeholder={'Enter your password...'}
                       onChange={e => setPassword(e.target.value)}/>
                <button className="registerButton">Register</button>
            </form>
            <button className={'registerLoginButton'} type={'submit'}>
                <Link className={'link'}
                      to={'register'}>Login</Link></button>
            {error && <span style={{color: 'red', marginTop: 10}}>Something went wrong</span>}
        </div>
    );
};

export default Register;