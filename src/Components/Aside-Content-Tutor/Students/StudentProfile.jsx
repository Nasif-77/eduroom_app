import { List, ListItem } from '@mui/material'
import React from 'react'
import classes from './students.module.css'


function StudentProfile(props) {
  const profile = props.profile
  return (

      <List className={classes.profileList}>
        <ListItem>Full Name:{profile.fname}</ListItem>
        <ListItem>Email:{profile.email}</ListItem>
        <ListItem>Contact details:{profile.contact}</ListItem>
      </List>

  )
}

export default StudentProfile