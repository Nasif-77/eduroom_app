import { Button, List, ListItem, ListItemButton, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './home.module.css'
import Grid from '@mui/material/Unstable_Grid2'
import { IsAuth } from '../../../Helpers/hooks/isAuth'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()


  const [announce, setAnnounce] = useState([])
  const [event, setEvent] = useState([])
  const [flag, setFlag] = useState('home')
  const [eventSubject, setEventSubject] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [club, setClub] = useState('')
  const [imageUrl, setImageUrl] = useState('')


  useEffect(() => {
    console.log('token')
    const token = IsAuth()
    if (!token) navigate('/')
    const getEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/events`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setEvent(response.data.events)
      } catch (error) {

      }
    }
    let getAnnouncement = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/announcements`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setAnnounce(response.data.announcements)
      } catch (error) {
      }

    }
    getAnnouncement(); getEvent()
  }, [navigate])


  let date = Date()
  let month = date.split(' ')[1]
  let year = date.split(' ')[3]
  let day = date.split(' ')[2]
  date = ['', month, day, year].join(' ')
  let Announcementdate = [month, day, year].join(' ')


  //________________________________________________
  //________________________________________________

  return (

    <div className={classes.container}>

      <nav>
        <Typography variant='h5' textAlign={'center'} padding={2}>Date :{date}</Typography>
      </nav>





      {flag === 'home' ?
        <div className={classes.homeDiv}>

          <Grid spacing={1} container>

            <Grid xs={12} md={6}>
              <Box className={classes.announcement}>
                <nav>
                  <Typography padding={2} variant='h5'>Announcements Today</Typography>
                </nav>
                <Divider sx={{ background: 'white' }} />
                <Box sx={{ width: '100%', height: '100%' }}>
                  <List>
                    {announce.map((item, index) => {
                      if (item.date === Announcementdate) {
                        return (
                          <ListItem disablePadding key={index}>
                            <ListItemButton onClick={() => {
                              setFlag('announcement')
                              setEventDate(item.date)
                              setDescription(item.description)
                              setEventSubject(item.subject)
                              setImageUrl(item.imageUrl)
                            }}>
                              <h3 >{item.subject}</h3>
                            </ListItemButton>
                          </ListItem>
                        )
                      }
                      return ('')
                    })}
                  </List>
                </Box>
              </Box>
            </Grid>

            <Grid xs={12} md={6}>

              <Box className={classes.event}>
                <nav>
                  <Typography variant='h5' padding={2}>Events Today</Typography>
                </nav>
                <Divider sx={{ background: 'white' }} />
                <Box sx={{ width: '100%', height: '100%' }}>
                  <List>
                    {event.map((item, index) => {
                      if (item.date === date) {
                        return (
                          <ListItem disablePadding key={index}>
                            <ListItemButton onClick={() => {
                              setFlag('event')
                              setEventDate(item.date)
                              setDescription(item.description)
                              setEventSubject(item.event)
                              setClub(item.club)
                            }}>
                              <h3>{item.event}</h3>
                            </ListItemButton>
                          </ListItem>
                        )
                      }
                      return ('')

                    })}
                  </List>
                </Box>

              </Box>

            </Grid>
          </Grid>

        </div>
        : ''}




      {flag === 'announcement' ? <div className={classes.announcementDiv}>
        <Button onClick={() => setFlag('home')}>
          Back
        </Button>
        <div>
          <h2>Subject:{eventSubject}</h2>
          <h4>Announced Date:{eventDate}</h4>
          <div>
            <p>Description:{description}</p>
          </div>

          <div>
            <img src={`${process.env.REACT_APP_SERVER_URL}/${imageUrl}`} alt="" />
          </div>

        </div>
      </div> : ''}




      {flag === 'event' ? <div className={classes.eventDiv}>
        <Button onClick={() => setFlag('home')}>
          Back
        </Button>
        <div>
          <h2>Event:{eventSubject}</h2>
          <h3>Conducted by:{club}</h3>
          <div>
            <h4>Event Date:{eventDate}</h4>
            <p>Description:{description}</p>
          </div>


        </div>
      </div> : ''}

    </div>
  )
}

export default Home