import { Button, List, ListItem, ListItemButton,Divider } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './home.module.css'
import Grid from '@mui/material/Unstable_Grid2'

function Home() {


  const [announce, setAnnounce] = useState([])
  const [event, setEvent] = useState([])
  const [flag, setFlag] = useState('home')
  const [eventSubject, setEventSubject] = useState('')
  const [description, setDescription] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [club, setClub] = useState('')
  const [imageUrl, setImageUrl] = useState('')


  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/events`)
        setEvent(response.data)
      } catch (error) {

      }
    }
    let getAnnouncement = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/announcements`)
        let data = response.data
        setAnnounce(data)
      } catch (error) {
      }

    }
    getAnnouncement(); getEvent()
  }, [])


  let date = Date()
  let month = date.split(' ')[1]
  let year = date.split(' ')[3]
  let day = date.split(' ')[2]
  date = [month, day, year].join(' ')


  //________________________________________________
  //________________________________________________

  return (

    <div className={classes.container}>
      <nav>
        <h3>Date :{date}</h3>
        <h3>Attendence:Present</h3>
      </nav>





      {flag === 'home' ?
        <div className={classes.homeDiv}>

          <Grid spacing={1} container>

            <Grid xs={12} md={6}>
              <Box className={classes.announcement}>
                <nav>
                      <h2>Announcements Today</h2>
                    </nav>
                    <Divider sx={{ background: 'white' }} />
                    <Box sx={{ width: '100%', height: '100%' }}>
                      <List>
                        {announce.forEach((item, index) => {
                          if (item.date === date) {
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
                        })}
                      </List>
                    </Box>

              </Box>
            </Grid>




            <Grid xs={12} md={6}>

              <Box className={classes.event}>
                <nav>
                    <h2>Events Today</h2>
                  </nav>
                  <Divider sx={{ background: 'white' }} />
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <List>
                      {event.forEach((item, index) => {
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
            <img src={`${process.env.REACT_APP_SERVER_URL}/${imageUrl}`} alt="" width={600} />
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