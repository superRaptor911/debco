import React, {useRef, useState} from 'react';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link, useHistory} from 'react-router-dom';
import {ROUTES} from '../Routes';
import Alert from '@mui/material/Alert';
import {addRoom, uploadFiles, uploadFilesIpfs} from '../api/api';

const AddRoom = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const nameRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const descriptionRef = useRef();
  const roomCapacityRef = useRef();
  const priceRef = useRef();
  const mediaRef = useRef();

  const onFilesSelected = e => {
    mediaRef.current = e.target.files;
  };

  const handleSubmit = async () => {
    const name = nameRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const description = descriptionRef.current.value;
    const roomCapacity = roomCapacityRef.current.value;
    const price = priceRef.current.value;
    const files = mediaRef.current;

    const data = await uploadFilesIpfs(files);
    let previewImages = [];
    for (const i of data) {
      previewImages.push(i.path);
    }
    previewImages = previewImages.slice(0, 5);
    previewImages.map(item => {
      console.log(item);
      return item;
    });
    try {
      const result = await addRoom(
        name,
        city,
        state,
        country,
        description,
        roomCapacity,
        price,
        previewImages,
      );
      history.push(ROUTES.dashboard.path);
    } catch (e) {
      console.error('AddRoom::Error', e);
    }
  };

  return (
    <div>
      <h2 style={{textAlign: 'center', marginTop: 50}}>Add Room</h2>
      <Paper
        style={{
          maxWidth: 500,
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          marginTop: 50,
        }}>
        <Input placeholder="Name" inputRef={nameRef} />
        <div style={{marginTop: 40}} />
        <Input placeholder="City" inputRef={cityRef} />
        <div style={{marginTop: 40}} />
        <Input placeholder="State" inputRef={stateRef} />
        <div style={{marginTop: 40}} />
        <Input placeholder="Country" inputRef={countryRef} />
        <div style={{marginTop: 40}} />
        <Input placeholder="Description" inputRef={descriptionRef} />
        <div style={{marginTop: 40}} />
        <Input
          placeholder="Room Capacity"
          type="number"
          inputRef={roomCapacityRef}
        />
        <div style={{marginTop: 40}} />
        <Input placeholder="Price" type="number" inputRef={priceRef} />
        <div style={{marginTop: 40}} />

        <input
          type="file"
          id="myFile"
          name="filename"
          multiple
          accept="image/*"
          onChange={onFilesSelected}
        />

        <div style={{marginTop: 40}} />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        {error && (
          <Alert severity="error" sx={{marginTop: 2}}>
            {error}
          </Alert>
        )}

        <Link to={ROUTES.home.path} style={{textAlign: 'right', marginTop: 15}}>
          Home
        </Link>
      </Paper>
    </div>
  );
};

export default AddRoom;
