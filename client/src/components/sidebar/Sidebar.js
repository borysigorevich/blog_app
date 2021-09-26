import React, {useEffect, useState} from 'react';
import './sidebar.css'
import axios from "axios";
import {Link} from "react-router-dom";

const Sidebar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const categories = await axios.get('/categories')
            setCategories(categories.data)
        }
        getCategories()
    }, [])

    return (
        <div className={'sidebar'}>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                    alt="img"/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid autem commodi, iure laborum
                    molestiae perferendis quia quo sunt vel.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className={'sidebarList'}>
                    {categories.map((category) => {
                        return <Link key={category._id} className={'link'} to={`/?category=${category.name}`}>
                            <li key={category._id} className="sidebarListItem">{category.name}</li>
                        </Link>
                    })}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook"></i>
                    <i className="sidebarIcon fab fa-twitter"></i>
                    <i className="sidebarIcon fab fa-pinterest"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;