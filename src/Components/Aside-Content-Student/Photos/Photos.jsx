import { Button, ImageList, ImageListItem, List, ListItem, ListItemButton } from '@mui/material'
import { makeStyles } from '@mui/material/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './photos.module.css'

function Photos() {



  const [subject, setSubject] = useState('')
  const [data, setData] = useState([])
  const [flag, setFlag] = useState('home')
  const [images, setImages] = useState([])

  useEffect(() => {
    const getPhotos = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/photos`)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPhotos();
  }, [])
  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Photos</h1>
      </nav>

      <div className={classes.mainDiv}>


        {flag === 'home' ? <div>

          <nav>
            <h3>Photo Catagories</h3>
          </nav>

          <List>
            {data.map((item, index) => {
              return (
                <ListItem key={index} style={{ marginBottom: '20px ' }}>
                  <ListItemButton className={classes.ListItemButton} sx={{ backgroundColor: 'black', color: 'white', borderRadius: '10px' }} onClick={() => {
                    setFlag('images')
                    setImages(item.files)
                    setSubject(item.subject)

                  }}>{item.subject} </ListItemButton>

                </ListItem>
              )
            })}
          </List>
        </div> : ''}


        {flag === 'images' ?
          <div className={classes.imagesDiv}>
            <nav>
              <Button onClick={() => setFlag('home')} >Back</Button>

            </nav>
            <br /><br /><br />
            <h1>{subject}</h1>

            <ImageList
              sx={{ width: 'auto', height: 'auto' }}
              variant='quilted'
              cols={3} rowHeight={214}>

              {images.map((item, index) => {
                return (
                  <ImageListItem key={item.filePath}>
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/${item.filePath}`}
                      srcSet={`${item.filePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={'Cars'}
                      loading="lazy"
                    />
                  </ImageListItem>

                )
              })}
            </ImageList>
          </div>
          : ''}




      </div>
    </div>
  )
}

export default Photos