import React from 'react'
import Masonary from 'react-masonry-css';
import Pin from '../Pin/Pin';

import './MasonaryWrap.css';

const breakpointObject = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ pins }) => {
  return (
    <Masonary className='masonary-wrap' breakpointCols={breakpointObject}>
      {pins?.map((pin) => <Pin key={pin._id} pin={pin} className='masonary-pin'/>)}
    </Masonary>
  )
}

export default MasonryLayout
