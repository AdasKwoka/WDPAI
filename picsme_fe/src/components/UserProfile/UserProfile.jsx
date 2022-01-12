import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../../utils/data';
import { client } from '../../client';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import Spinner from '../Spinner/Spinner';

import './UserProfile.css';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,technology,computers';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [userId])

  useEffect(() => {
    if(text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data);
        })
    }
  }, [text, userId])
  if(!user) {
    return <Spinner message='Loading profile...' />
  }

  return (
    <div className='user-profile-wrap'>
      <div className='user-profile-sec-wrap'>
        <div className='user-profile-thi-wrap'>
          <div className='user-profile-fou-wrap'>
            <img src={randomImage} alt="random" className='user-profile-image'/>
            <img src={user.image} alt="user-pic" className='user-profile-user-image'/>
            <h1 className='user-profile-title'>{user.userName}</h1>
            <div className='user-profile-logout'>
              <GoogleLogout 
                clientId={process.env.REACT_APP_GOOGLE_TOKEN}
                render={(renderProps) => (
                  <button
                    type="button"
                    className='user-profile-logout-btn'
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color='red' fontSize={21}/>
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy='single_host_origin'
              />
            </div>
          </div>
          <div className='user-profile-btns-wrap'>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`user-profile-created-btn ${activeBtn === 'created' ? 'active' : null}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              className={`user-profile-created-btn ${activeBtn === 'saved' ? 'active' : null}`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className='user-profile-pins-wrapper'>
              <MasonryLayout pins={pins} />
            </div>
          ):(
            <div className='user-profile-pins-error'>
              No pins found
            </div>
          )} 
        </div>
      </div>
    </div>
  )
}

export default UserProfile
