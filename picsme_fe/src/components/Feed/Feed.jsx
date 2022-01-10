import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../../client';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import Spinner from '../Spinner/Spinner';


import './Feed.css';

const Feed = () => {
  const [loading, setLoading] = useState(false);

  if(loading) return <Spinner message="We are adding new feed!"/>
  return (
    <div className='feed-wrap'>
      feed
    </div>
  )
}

export default Feed
