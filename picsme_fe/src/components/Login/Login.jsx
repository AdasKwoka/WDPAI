import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import loginVid from '../../assets/login_vid.mp4';
import logo from '../../assets/logo-white.png';

import { client } from '../../client';

import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response?.profileObj));

    const { name, googleId, imageUrl } = response?.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true });
      })
  }
  return (
    <div className='login-wrapper'>
      <div className='login-video-wrap'>
        <video 
          src={loginVid}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='login-video'
        />
      </div>
      <div className='login-dark'>
        <div className='login-logo-wrap'>
          <img src={logo} width="130px" alt="logo" />
        </div>
        <div className='login-google-wrap'>
          <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_TOKEN}
            render={(renderProps) => (
              <button
                type="button"
                className='login-google-button'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className='login-google-icon'/>
                Sign in with Google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
          />
        </div>
      </div>
    </div>
  )
}

export default Login;

