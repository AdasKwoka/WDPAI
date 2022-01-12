import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../../client';
import { fetchUser } from '../../utils/fetchUser';

import './Pin.css';

const Pin = ({ pin: { postedBy, image, _id, destination, save}}) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.googleId))?.length;
  console.log(alreadySaved);

  const savePin = (id) => {
    if(!alreadySaved) {

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId
          }
        }])
        .commit()
        .then((() => {
          window.location.reload();
        }))
    }
  }

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      })
  }

  return (
    <div className='pin-wrapper'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='pin-sec-wrap'
      >
        <img src={urlFor(image).width(250).url()} alt="user-post" className='pin-image'/>
        {postHovered && (
          <div className='pin-additionals-wrap'>
            <div className='pin-additionals-sec-wrap'>
              <div className='pin-additionals-download'>
                <a 
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='pin-download-icon'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button type='button' className='pin-button' onClick={(e) => {
                  e.stopPropagation();
                }}>
                 {save?.length} Saved
                </button>
              ): (
                <button type='button' className='pin-button' onClick={(e) => {
                  e.stopPropagation();
                  savePin(_id);
                }}>
                  Save
                </button>
              )}
            </div>
            <div className='pin-destination-wrap'>
                {destination && (
                  <a
                    href={destination}
                    target="_blank"
                    rel='noreferrer'
                    className='pin-destination'
                  >
                    <BsFillArrowUpRightCircleFill />
                  </a>
                )}
                {postedBy?._id === user?.googleId && (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    className='pin-button pin-delete-button'
                  >
                    <AiTwotoneDelete />
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className='pin-author-add'>
          <img src={postedBy?.image} alt="user-profile" className='pin-author-image'/>
          <p className='pin-author-text'>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin
