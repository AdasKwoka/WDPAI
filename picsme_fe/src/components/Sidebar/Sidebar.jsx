import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

import logo from '../../assets/logo.png';
import './Sidebar.css';

import { categories } from '../../utils/data';

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }
  return (
    <div className='sidebar-wrap'>
      <div className='sidebar-sec-wrap'>
        <Link
          to="/"
          className='sidebar-logo-wrap'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className='sidebar-logo'/>
        </Link>
        <div className='sidebar-nav-wrap'>
          <NavLink
            to="/"
            className={`sidebar-nav-item ${({ isActive }) => isActive && "active"}`}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            home
          </NavLink>
          <h3 className='sidebar-nav-header'>
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={`sidebar-nav-item ${({ isActive }) => isActive && "active"}`}
              onClick={handleCloseSidebar}
              key={category.name}
            > 
              <img src={category.image} className='sidebar-category-image' alt='category-pic'/>
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='sidebar-user-profile'
          onClick={handleCloseSidebar}
        >
          <img src={user.image ? user.image : "https://img.icons8.com/external-dreamstale-lineal-dreamstale/50/000000/external-avatar-avatars-dreamstale-lineal-dreamstale.png"} alt="user" className='sidebar-user-photo'/>
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
