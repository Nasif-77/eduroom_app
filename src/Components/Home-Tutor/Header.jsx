import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './header.module.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import Sidebar from './Sidebar';
import { Button, Drawer, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';



function Header() {

  const [open, setOpen] = useState(false);
  const [greet, setGreet] = useState('hello');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [drawer, setDrawer] = useState(false)

  let time = Date()
  time = time.split(' ')
  time = time[4]
  let hour = time.toString().slice(0,2)

  const functionGreet = (hour)=>{
    if(hour>5&&hour<12){
      setGreet('Good Morning')
    }
    else if(hour>12&&hour<15){
      setGreet('Good Afternoon')
    }else{
      setGreet('Good Evening')
    }

  }
  
useEffect(()=>{
  functionGreet(hour)
})
  


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

        <h1>{greet} <Link to={'profile'}><span style={{ color: 'rgb(210, 238, 210)', fontFamily: 'monospace', fontSize: 30 }}>{fullname}</span></Link></h1>
        

      </div>

      <div className={classes.div2}>

        <div>
          <IconButton size='medium' onClick={handleClickOpen}><PowerSettingsNewIcon titleAccess='Logout' fontSize='medium' /></IconButton>
        </div>

      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to log out?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={logout} autoFocus>
              <Link to='/tutor/login' style={{ color: 'inherit', textDecoration: 'none' }}>
                Logout
              </Link>
            </Button>
          </DialogActions>
        </Dialog>
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