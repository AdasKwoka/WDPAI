import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from '../../client';
import Spinner from '../Spinner/Spinner';
import { categories } from '../../utils/data';

import './CreatePin.css';

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          filename: name
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Image upload error', error);
        })
    } else {
      setWrongImageType(true);
    }
  }

  const savePin = () => {
    if(title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      }
      client.create(doc)
        .then(() => {
          navigate('/');
        })
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000)
    }
  }

  return (
    <div className='create-pin-wrap'>
      {fields && (
        <p className='create-pin-error'>
          Please fill in all fields.
        </p>
      )}
      <div className='create-pin-form'>
        <div className='create-pin-sec-form'>
          <div className='create-pin-thi-form'>
            {loading && <Spinner />}
            {wrongImageType && (<p>Wrong image type</p>)}
            {!imageAsset ? (
              <label>
                <div className='create-pin-not-asset'>
                  <div className='create-pin-sec-not-asset'>
                    <p className='create-pin-not-asset-icon'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='create-pin-not-asset-desc'>
                      Click to upload
                    </p>
                    <p className='create-pin-not-asset-add'>
                      Use high-quality JPG, SVG, PNG, GIF less than 20 MB
                    </p>
                  </div>
                </div>
                <input type="file" name='upload-image' onChange={uploadImage} className='create-pin-upload'/>
              </label>
            ): (
              <div className='create-pin-uploaded-wrap'>
                <img src={imageAsset?.url} alt='uploaded-pic' className='create-pin-uploaded-photo' />
                <button
                 type='button'
                 className='create-pin-uploaded-delete'
                 onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='create-pin-form-wrap'>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add your title here'
            className='create-pin-form-title'
          />
          {user && (
            <div className='create-pin-form-user'>
              <img src={user.image} alt="user-details" className='create-pin-form-userphoto' />
              <p className='create-pin-form-userdesc'>{user.userName}</p>
            </div>
          )}
          <input 
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='What is your pin about'
            className='create-pin-form-item'
          />
          <input 
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Add a destination link'
            className='create-pin-form-item'
          />
          <div className='create-pin-category-wrap'>
            <p className='create-pin-category-title'>Choose Pin Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className='create-pin-category-select'
            >
              <option value="other" className='create-pin-category-option-def'>Select category</option>

              {categories.map((category) => (
                <option className='create-pin-category-option' value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='create-pin-save-wrap'>
            <button
              type='button'
              onClick={savePin}
              className='create-pin-save-button'
            >
              Save pin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin
