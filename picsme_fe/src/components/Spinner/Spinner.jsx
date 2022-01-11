import React from 'react';
import Loader from 'react-loader-spinner';

import './Spinner.css'

const Spinner = ({ message }) => {
  return (
    <div className='spinner-wrap'>
      <Loader 
        type='Circles'
        color='#00BFFF'
        height={50}
        width={200}
        className='spinner-spinComp'
      />

      <p className='spinner-message'>{message}</p>
    </div>
  )
}

export default Spinner
