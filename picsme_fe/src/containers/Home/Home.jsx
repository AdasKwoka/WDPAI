import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Sidebar, UserProfile } from '../../components';
import Pins from '../Pins/Pins';
import { client } from '../../client';
import { userQuery } from '../../utils/data';
import { fetchUser } from '../../utils/fetchUser';
import logo from '../../assets/logo.png';

import './Home.css'

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  console.log(userInfo)
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className='home-wrap'>
      <div className='home-desktop-bar'>
        <Sidebar user={user && user} />
      </div>
      <div className='home-mobile-bar'>
        <div className='home-top-bar'>
          <HiMenu fontSize={40} className='home-open-bar' onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" width='56px'/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image ? user.image : "https://img.icons8.com/external-dreamstale-lineal-dreamstale/50/000000/external-avatar-avatars-dreamstale-lineal-dreamstale.png"} alt="logo" width='36px'/>
          </Link>
        </div>
      </div>
      {toggleSidebar && (
        <div className={`home-sidebar ${toggleSidebar && "active"}`}>
          <div className='home-close-bar'>
            <AiFillCloseCircle fontSize={30} onClick={() => setToggleSidebar(false)}/>
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
        </div>
      )}
      <div className='home-pins-wrapper' ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default Home;
