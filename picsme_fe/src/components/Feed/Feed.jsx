import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { client } from '../../client';
import { feedQuery, searchQuery } from '../../utils/data';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import Spinner from '../Spinner/Spinner';


import './Feed.css';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('user')) navigate('/login');
  }, [])

  useEffect(() => {
    setLoading(true);

    if(categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }
  }, [categoryId])

  if(loading) return <Spinner message="We are adding new feed!"/>

  if(!pins?.length) return <h2>No pins available</h2>
  return (
    <div className='feed-wrap'>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
