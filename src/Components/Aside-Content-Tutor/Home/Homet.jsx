import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, List, ListItem, ListItemButton, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './home.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Unstable_Grid2'


function HomeT() {

  const [time, setTime] = useState('')
  const [students, setStudents] = useState('')
  const [event, setEvent] = useState([])
  const [flag, setFlag] = useState('home')
  const [eventSubject, setEventSubject] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [club, setClub] = useState('')



  useEffect(() => {
    const getStudents = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/students`)
        let data = response.data
        setStudents(data.length)
      } catch (error) {
      }
    }

    const getEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/events`)
        setEvent(response.data)
      } catch (error) {

      }
    }

    getStudents()
    getEvent()
  }, [])


  let date = Date()
  let month = date.split(' ')[1]
  let year = date.split(' ')[3]
  let day = date.split(' ')[2]
  date = ['', month, day, year].join(' ')



  const getTime = () => {
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    let AmPm = 'AM'
    if (s < 10) {
      s = '0' + s
    }
    if (m < 10) {
      m = '0' + m
    }
    if (h > 12) {
      AmPm = 'PM'
      h = h - 12
      if (h < 10) {
        h = '0' + h
      }
    }
    setTime(h + ":" + m + ":" + s + ' ' + AmPm);
  }

  setInterval(getTime, 1000);



  return (
    <div className={classes.container}>

      {flag === 'home' ? <div className={classes.mainDiv}>

        <nav>
          <Typography variant='h5' textAlign={'right'} paddingBottom={0} paddingTop={3} paddingRight={3} fontWeight={700}> {Date().slice(0, 15)}</Typography>
          <Typography variant='h5' textAlign={'right'} paddingTop={0} paddingRight={3} fontWeight={700}> {time}</Typography>
        </nav>

        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          bgcolor={'white'}
          color={'white'}
          boxShadow={'3px 5px 5px 5px #729c73'}
          sx={{
            ":hover": {

              boxShadow: '3px 5px 7px 8px #729c73'
            }
          }}
        >

          <Grid container xs={12}>

            <Grid xs={12} lg={6}>
              <Card
                sx={{
                  bgcolor: 'black',
                  color: 'white'

                }}
              >
                <CardMedia
                  component="svg"
                  height="194"
                  image="/Images/graduation-cap-svgrepo-com.svg"
                  alt="Graduation Cap"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Number of Students Enrolled : {students}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant='contained' color="primary">
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/tutor/home/students'}>
                      See more
                    </Link>
                  </Button>
                </CardActions>

              </Card>
            </Grid>



            <Grid xs={12} lg={6}>
              <Box
                height={''}
                bgcolor={'white'}
                color={'black'}
              >
                <Typography gutterBottom variant="h5" textAlign={'center'} component="div">
                  Events Today
                </Typography>
                <List>

                  {event.map((item, index) => {
                    if (item.date === date) {
                      return (
                        <ListItem disablePadding key={index}>
                          <ListItemButton onClick={() => {
                            setFlag('details')
                            setEventDate(item.date)
                            setDescription(item.description)
                            setEventSubject(item.event)
                            setClub(item.club)
                          }}>
                            <h3>{item.event}Event</h3>
                          </ListItemButton>
                        </ListItem>
                      )
                    } return ('')
                  })}
                </List>
              </Box>
            </Grid>


          </Grid>
        </Box>

      </div> : ''}


      {flag === 'details' ?
        <Box
          padding={3}
        >
          <IconButton onClick={() => setFlag('home')}>
            <ArrowBackIcon color='info' fontSize='medium' />
          </IconButton>
          <div>
            <h2>Event:{eventSubject}</h2>
            <h3>Conducted by:{club}</h3>
            <div>
              <h4>Event Date:{eventDate}</h4>
              <p>Description:{description}</p>
            </div>


          </div>
        </Box> : ''}


    </div>
  )
}

export default HomeT