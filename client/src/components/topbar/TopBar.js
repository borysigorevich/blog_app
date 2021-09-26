import React, {useContext, useState} from 'react';
import './topbar.css'
import {Link} from "react-router-dom";
import {Context} from "../../context/Context";
import {Logout} from "../../context/Actions";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const TopBar = () => {
    const {user, dispatch} = useContext(Context)
    const PF = 'http://localhost:5000/images/'

    const handleLogout = () => {
        dispatch(Logout())
    }

    return (
        <div className={'top'}>
            <div className="topLeft">
                <i className="topIcon fab fa-facebook"></i>
                <i className="topIcon fab fa-twitter"></i>
                <i className="topIcon fab fa-pinterest"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className={'topList'}>
                    <li className={'topListItem'}>
                        <Link className={'link'} to={'/'}>HOME</Link>
                    </li>
                    <li className={'topListItem'}>
                        <Link className={'link'} to={'/'}>ABOUT</Link>
                    </li>
                    <li className={'topListItem'}>
                        <Link className={'link'} to={'/'}>CONTACT</Link>
                    </li>
                    <li className={'topListItem'}>
                        <Link className={'link'} to={'/write'}>WRITE</Link>
                    </li>
                    <li className={'topListItem'} onClick={handleLogout}>
                        {user && 'LOGOUT'}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (user.profilePicture
                        ? <Link className={'link'} to={'/settings'}><img className={'topImg'}
                                     src={PF + user.profilePicture}
                                     alt="img"/></Link>
                        : <Link className={'link'} to={'/settings'}><img className={'topImg'} src={PF + 'monkey-6491669_1920.jpg'} alt="img"/></Link>
                    ) :
                    (<ul className={'topList'}>
                        <li className={'topListItem'}><Link className={'link'} to={'/login'}>LOGIN</Link></li>
                        <li className={'topListItem'}><Link className={'link'} to={'/register'}>REGISTER</Link></li>
                    </ul>)}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    );
};

export default TopBar;