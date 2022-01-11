import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { NavBar, Feed, PinDetail, CreatePin, Search } from '../../components';

import './Pins.css';

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='pins-wrap'>
      <div className='pins-sec-wrap'>
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
      </div>
      <div className='pins-thi-wrap'>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/pin-detail/:pinId" element={<PinDetail user={user} />} />
            <Route path="/create-pin" element={<CreatePin user={user} />} />
            <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Routes>
        </div>
    </div>
  )
}

export default Pins;
