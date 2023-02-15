import { Button } from '@mui/joy'
import React, { useState } from 'react'
import {  Link } from 'react-router-dom'
import classes from './header.module.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import Sidebar from './Sidebar';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';



function Header() {


  const [drawer, setDrawer] = useState(false)

  let user = localStorage.getItem('user')
  user = JSON.parse(user)
  let fullname = user.name
  fullname = fullname.toUpperCase()




  const logout = () => {
    localStorage.removeItem('user')

  }
  return (

    <div className={classes.Header}>

      <div className={classes.div1}>
        <DehazeIcon onClick={() => { setDrawer(true) }} fontSize='medium' className={classes.DehazeIcon} />
        
        <h1 style={{ color: "white" }}>Hi <span style={{ color: 'blanchedalmond', fontFamily: 'serif', fontSize: 30 }}>{fullname}</span></h1>
      </div>
      
      <div className={classes.div2}>
        <Link to='/student/login'>
          <Button onClick={logout}>Log Out</Button>
        </Link>
      </div>

      <Drawer
        anchor='left'
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          onClick={() => setDrawer(false)}
          onKeyDown={() => setDrawer(false)}
        > <Sidebar /></Box>

      </Drawer>
    </div>
  )
}

export default Header