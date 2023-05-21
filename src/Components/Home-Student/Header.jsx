import React, { useState } from 'react'
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom'
import classes from './header.module.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import Sidebar from './Sidebar';
import { Dialog, DialogActions, DialogTitle, Drawer, IconButton, Button } from '@mui/material';
import Box from '@mui/material/Box';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';



function Header() {


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [drawer, setDrawer] = useState(false)

  let token = localStorage.getItem('token')
  let user = jwtDecode(token)
  let name = user.name
  name = name.toUpperCase()




  const logout = () => {
    localStorage.removeItem('token')

  }
  return (

    <div className={classes.Header}>

      <div className={classes.div1}>
        <DehazeIcon onClick={() => { setDrawer(true) }} fontSize='medium' className={classes.DehazeIcon} />

        <h1 style={{ color: "white" }}>Hi <span style={{ color: 'blanchedalmond', fontFamily: 'serif', fontSize: 30 }}>{name}</span></h1>
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
              <Link to='/student/login' style={{ color: 'inherit', textDecoration: 'none' }}>
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