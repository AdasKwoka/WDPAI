import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../../utils/data';
import Spinner from '../Spinner/Spinner';

import './PinDetail.css';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if(query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);

          if(data[0]) {
            query = pinDetailMorePinQuery(data[0]);
            client.fetch(query)
              .then((res) => {
                setPins(res);
              })
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if(comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        })
    }
  }

  if(!pinDetail) return <Spinner message="Loading pin..."/>

  return (
    <>
      <div className='pin-detail-wrap'>
        <div className='pin-detail-sec-wrap'>
          <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt='pin-detail' className='pin-detail-image' />
        </div>
        <div className='pin-detail-thi-wrap'>
          <div className='pin-detail-fou-wrap'>
            <div className='pin-detail-fif-wrap'>
              <a 
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='pin-detail-download-icon'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target='_blank'
              rel="noreferrer"
            >
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className='pin-detail-header'>{pinDetail.title}</h1>
            <p className='pin-detail-desc'>{pinDetail.about}</p>
          </div>
          <Link to={`user-profile/${pinDetail.postedBy?._id}`} className='pin-detail-author-add'>
            <img src={pinDetail.postedBy?.image} alt="user-profile" className='pin-detail-author-image'/>
            <p className='pin-detail-author-text'>{pinDetail.postedBy?.userName}</p>
          </Link>
          <h2 className='pin-detail-comment-title'>Comments</h2>
          <div className='pin-detail-comment-wrap'>
            {pinDetail?.comments?.map((comment, i) => (
              <div className='pin-detail-comment-text-wrap' key={i}>
                <img src={comment.postedBy.image} alt="user-profile" className='pin-detail-comment-image'/>
                <div className='pin-detail-comment-author-wrap'>
                  <p className='pin-detail-comment-author-name'>{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='pin-detail-create-commment-wrap'>
            <Link to={`user-profile/${pinDetail.postedBy?._id}`}>
              <img src={pinDetail.postedBy?.image} alt="user-profile" className='pin-detail-comment-image'/>
            </Link>
            <input 
              type="text" 
              className='pin-detail-create-comment-input' 
              placeholder='Add a comment' value={comment} 
              onChange={(e) => setComment(e.target.value) }
            />
            <button type='button' className='pin-detail-add-comment' onClick={addComment}>
              {addingComment ? 'Posting comment ...' : 'Post it!'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className='pin-detail-similar-title'>More like this</h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <Spinner message="Loading more pins..."/>
      )}
    </>
  )
}

export default PinDetail
