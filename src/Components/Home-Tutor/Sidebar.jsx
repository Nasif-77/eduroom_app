import React from 'react'
import { Link } from 'react-router-dom'
import classes from './sidebar.module.css'
import { List, ListItem, ListItemButton } from '@mui/material'

function Sidebar() {

  return (
    <List className={classes.list}>

      <Link to={'home'}>
        <ListItem>
          <ListItemButton>
            Home
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to={'attendence'}>
        <ListItem>
          <ListItemButton>
            Attendance
          </ListItemButton>
        </ListItem>
      </Link>


      <Link to={'students'}>
        <ListItem>
          <ListItemButton>
            Students
          </ListItemButton>
        </ListItem>
      </Link>


      <Link to={'assignments'}>
        <ListItem>
          <ListItemButton>
            Assignments
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to={'announcements'}>
        <ListItem>
          <ListItemButton>
            Announcements
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to={'notes'}>
        <ListItem>
          <ListItemButton>
            Notes
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to={'events'}>
        <ListItem>
          <ListItemButton>
            Events
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to={'photos'}>
        <ListItem>
          <ListItemButton>
            Photos
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to={'profile'}>
        <ListItem>
          <ListItemButton>
            Profile
          </ListItemButton>
        </ListItem>
      </Link>

    </List>

  )
}

export default Sidebar