import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

import './NavBar.css';

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  if(!user) return null;
  return (
    <div className='navbar-wrap'>
      <div className='navbar-search-wrap'>
        <IoMdSearch fontSize={21} className='navbar-search' />
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='navbar-serach-item'
        />
      </div>
      <div className='navbar-additionals'>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user.image} alt="user" className='navbar-user-photo'/>
        </Link>
        <Link to='/create-pin' className='navbar-addnew'>
          <IoMdAdd className='navbar-addnew-icon'/>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
