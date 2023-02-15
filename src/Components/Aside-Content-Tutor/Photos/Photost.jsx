import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import classes from './photos.module.css'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
function PhotosT() {

  const [files, setFiles] = useState([])
  const [subject, setSubject] = useState('')
  const [data, setData] = useState([])
  const [flag, setFlag] = useState('home')
  const [images, setImages] = useState([])
  const [imagePath, setImagePath] = useState({})
  const [imageName, setImageName] = useState({})
  const [id, setId] = useState('')

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [saveBtn, setSaveBtn] = useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };




  useEffect(() => {
    const getValues = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/photos`)
        setData(response.data)
      } catch (error) {
      }
    }
    getValues();
  }, [])




  const sentValues = async () => {
    try {
      const formData = new FormData();
      formData.append('subject', subject)
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/tutor/home/photos`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

    } catch (error) {
    }
  }



  const addPhotos = async () => {
    try {
      const formData = new FormData();
      formData.append('subject', subject)
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }

      await axios.put(`${process.env.REACT_APP_SERVER_URL}/tutor/home/photos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

    } catch (error) {

    }
  }


  const deletePhoto = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/tutor/home/photos/${id}`, {
        filePath: imagePath,
        fileName: imageName
      })
    } catch (error) {
    }
  }



  const changeSubject = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/tutor/home/photos/${id}`, {
        subject: subject
      })

    } catch (error) {

    }
  }



  const deleteSubject = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tutor/home/photos/${id}`)
    } catch (error) {
    }
  }



  return (
    <div className={classes.container}>

      <nav className={classes.nav}>
        <h1>Photos</h1>
      </nav>

      <div className={classes.mainDiv}>

        {flag === 'home' ? <div>
          <form action="" onSubmit={sentValues}>

            <TextField label={'Subject'} type="text" required={true} onChange={(e) => { setSubject(e.target.value) }} />
            <br /><br />

            <Button
              sx={{ background: '#009688' }} variant="contained" component="label" >Upload File
              <input type="file" required={true} hidden onChange={(e) => { setFiles(e.target.files) }} multiple />
            </Button>
            <br /><br />
            <Button variant='contained' type={'submit'}>Save</Button>
          </form>
          <br /><br />
          <Button onClick={() => setFlag('all')}>All Pictures</Button>

        </div> : ''}



        {flag === 'all' ? <div>
          <Button onClick={() => setFlag('home')} >Back</Button>
          <br /><br /><br />
          <ol>


            {data.map((item, index) => {
              return (
                <li key={index} style={{ marginBottom: '20px ' }}>
                  <Button variant='text' onClick={() => {
                    setFlag('images')
                    setImages(item.files)
                    setSubject(item.subject)
                    setId(item._id)

                  }}>{item.subject} </Button>
                  <Button variant='outlined' color='success' onClick={() => {
                    setFlag('editSubject');
                    setId(item._id)
                    setImages(item.files)
                    setSubject(item.subject)
                  }}>Edit Subject</Button>
                  <Button color='error' variant='outlined' onClick={() => {
                    setId(item._id)
                    handleClickOpen1()
                    setSubject(item.subject)
                  }}>delete</Button>
                  <Dialog
                    open={open1}
                    onClose={handleClose1}
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"this whole section will be permenantly deleted ?"}
                    </DialogTitle>
                    <DialogActions>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Subject:{subject}
                        </DialogContentText>
                      </DialogContent>
                      <Button onClick={handleClose1}>Cancel</Button>
                      <Button color='error' onClick={() => { deleteSubject(); handleClose1(); window.location.reload(); }} autoFocus>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>

                </li>
              )
            })}
          </ol>
        </div> : ''}





        {flag === 'editSubject' ? <div>
          <Button onClick={() => setFlag('all')} >Back</Button>
          <br /><br /><br />
          <form onSubmit={changeSubject}>
            <TextField onChange={(e) => { setSubject(e.target.value) }} required={true} defaultValue={subject} />
            <br /><br />
            <Button type='submit'>Confirm</Button>
          </form>
        </div>
          : ''}





        {flag === 'images' ?
          <div className={classes.imagesDiv}>
            <nav>
              <Button onClick={() => setFlag('all')} >Back</Button>
              <AddPhotoAlternateRoundedIcon
                onClick={() => handleClickOpen1()}
                sx={[{
                  '&:hover': {
                    backgroundColor: 'black', color: 'white'
                  }
                }, { cursor: 'pointer' }]}
              />
              <Dialog
                open={open1}
                onClose={handleClose1}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do you want to add new photos to this section?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose1}>Cancel</Button>
                  <Button
                    onClick={() => setSaveBtn(true)}
                    sx={{ background: '#009688' }} variant="contained" component="label" >Add+
                    <input type="file" required={true} hidden onChange={(e) => { setFiles(e.target.files) }} multiple />
                  </Button>
                  {saveBtn ? <Button
                    onClick={() => {
                      addPhotos(); handleClose1(); window.location.reload();
                    }}
                    sx={{ background: '#009688' }} variant="contained" component="label" >Upload Files
                  </Button> : ''}
                  { }
                </DialogActions>
              </Dialog>


            </nav>
            <br /><br /><br />
            <h1>{subject}</h1>
            {images.map((item, index) => {
              return (
                <div key={index} style={{ marginBottom: '50px' }}>
                  <img src={`${process.env.REACT_APP_SERVER_URL}/${item.filePath}`} alt="Images" width={500} />
                  <br />

                  <div>
                    <Button color='error' onClick={() => {
                      handleClickOpen2();
                      setImagePath(item.filePath)
                      setImageName(item.fileName)
                    }}>delete</Button>
                    <Dialog
                      open={open2}
                      onClose={handleClose2}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"this picture will be permenantly deleted ?"}
                      </DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose2}>Cancel</Button>
                        <Button color='error' onClick={() => {
                          deletePhoto(); window.location.reload(); setFlag('images')
                        }} autoFocus>
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              )
            })}
          </div>
          : ''}



      </div>

    </div>
  )
}

export default PhotosT