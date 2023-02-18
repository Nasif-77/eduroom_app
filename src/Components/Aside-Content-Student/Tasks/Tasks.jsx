import { Button, ListItemButton, List, ListItem, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import classes from './tasks.module.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


function Tasks() {
  useEffect(() => {
    const getAssignments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/assignments`)
        setAssignment(response.data)
      } catch (error) {

      }
    }
    const getNotes = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/notes`)
        setNotes(response.data)
      } catch (error) {

      }
    }
    getAssignments();
    getNotes();
  }, [])


  const [assignment, setAssignment] = useState([])
  const [notes, setNotes] = useState([])
  const [flag, setFlag] = useState('home')
  const [title, setTitle] = useState('')
  const [filePath, setFilePath] = useState('')
  const [description, setDescription] = useState('')



  let date = Date()
  let month = date.split(' ')[1]
  let year = date.split(' ')[3]
  let day = date.split(' ')[2]
  date = [day, month, year].join('/')


  return (
    <div className={classes.container}>

      {flag === 'home' ? <Grid xs={12} spacing={2} container>

        <Grid xs={12}>

          <nav>
            <Typography variant='h4' padding={2} fontWeight={600} textAlign={'center'}>Todays Task</Typography>
          </nav>

        </Grid>


        <Grid md={6} xs={12}>
          <div>
            <Typography variant='h6' padding={2} fontWeight={600}>Todays:Assignment</Typography>
            <Paper sx={{ backgroundColor: 'rgba(43, 43, 128, 0.177)' }} elevation={5}>
              <List>
                {assignment.map((item, index) => {
                  if (item.date === date) {
                    return (
                      <ListItem disablePadding key={index}>
                        <ListItemButton onClick={() => {
                          setFlag('assignment')
                          setTitle(item.title)
                          setDescription(item.description)
                          setFilePath(item.filePath)
                        }
                        }>
                          <p>{item.title}</p>
                        </ListItemButton>
                      </ListItem>
                    )
                  }
                  else {
                    return (
                      <Typography variant='h6' textAlign={'center'} key={index}>No Assignments Uploaded today</Typography>
                    )
                  }
                })}
              </List>
            </Paper>
          </div>
        </Grid>





        {/* Notes */}



        <Grid md={6} xs={12}>
          <div>
            <Typography variant='h6' padding={2} fontWeight={600}>Todays:Notes</Typography>


            <Paper sx={{ backgroundColor: 'rgba(43, 43, 128, 0.177)' }} elevation={5}>

              <List>

                {notes.map((item, index) => {
                  if (item.date === date) {
                    return (
                      <ListItem disablePadding key={index}>
                        <ListItemButton onClick={() => {
                          setFlag('notes')
                          setTitle(item.title)
                          setDescription(item.description)
                          setFilePath(item.filePath)
                        }}>
                          <p>{item.title}</p>
                        </ListItemButton>
                      </ListItem>
                    )
                  }
                  else {
                    return (
                      <Typography variant='h6' textAlign={'center'} key={index}>No Notes Uploaded Today</Typography>
                    )
                  }
                })}

              </List>


            </Paper>

          </div>
        </Grid>


      </Grid> : ''}



      {flag === 'assignment' ? <Grid container>
        <div>
          <Button onClick={() => setFlag('home')}>Back</Button>
          <h1>{title}</h1>
          <h3>Uploaded Date:Today</h3>
          <a style={{ textDecoration: 'none' }} href={`${process.env.REACT_APP_SERVER_URL}/${filePath}`}>Download Assignment<PictureAsPdfIcon /></a>

          <p>Description:{description}</p>
        </div>
      </Grid> : ''}





      {flag === 'notes' ? <Grid container>
        <div>
          <Button onClick={() => setFlag('home')}>Back</Button>
          <h1>{title}</h1>
          <h3>Uploaded Date:Today</h3>
          <a style={{ textDecoration: 'none' }} href={`${process.env.REACT_APP_SERVER_URL}/${filePath}`}>Download Note<PictureAsPdfIcon /></a>

          <p>Description:{description}</p>
        </div>
      </Grid> : ''}


    </div>
  )
}

export default Tasks