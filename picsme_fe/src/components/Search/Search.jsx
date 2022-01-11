import React, { useState, useEffect } from 'react';

import MasonryLayout from '../MasonryLayout/MasonryLayout';
import { client } from '../../client';
import { feedQuery, searchQuery } from '../../utils/data';
import Spinner from '../Spinner/Spinner';

import './Search.css';

const Search = ( {searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
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
  }, [searchTerm]);
  return (
    <div>
      {loading && <Spinner message="Searching fo pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins}/>}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className='search-not-found'>
          No pins found!
        </div>
      )}
    </div>
  )
}

export default Search
