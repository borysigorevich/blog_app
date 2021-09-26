import React from 'react';
import './header.css'

const Header = () => {
    return (
        <div className={'header'}>
            <div className="headerTitles">
                <span className={'headerTitleSmall'}>React & Node</span>
                <span className={'headerTitleLarge'}>Blog</span>
            </div>
            <img
                src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="img" className={'headerImg'}/>
        </div>
    );
};

export default Header;