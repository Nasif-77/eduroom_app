import {
  Button, Dialog, DialogActions, DialogTitle,
  TableContainer, Table, TableHead, TableBody, TableRow, TextField, TableCell
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './students.module.css'
import StudentProfile from './StudentProfile'

function StudentsT() {

  const [students, setStudents] = useState([])
  const [profile, setProfile] = useState([])
  const [flag, setFlag] = useState('home')
  const [fname, setfName] = useState('');
  const [fieldContact, setContact] = useState('');
  const [id, setId] = useState('')
  const [fieldEmail, setEmail] = useState('');
  const [blocked, setBlocked] = useState(true);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    const fetchValue = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/students`)
        let data = response.data
        setStudents(data)
      } catch (error) {
      }
    }
    fetchValue()
  }, [])

  const blockStudent = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/tutor/home/students/${id}`, {
        blocked: blocked
      })
    } catch (error) {

    }
  }

  const getProfile = async (name) => {
    let data
    try {
      students.map((item) => {
        let profile = item.fname === name.toLowerCase()
        if (profile && profile !== undefined) {
          data = item

        }
        return ('')
      })
    } catch (error) {
    }
    return data
  }


  const updateProfile = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/tutor/home/students/${id}`, {
        name: fname,
        contact: fieldContact,
        email: fieldEmail
      })
    } catch (error) {

    }
  }


  //---------------------------------------------------------------------------

  return (
    <div className={classes.container}>

      <nav className={classes.nav}>
        <h1>Students</h1>
      </nav>

      <div className={classes.mainDiv}>




        {flag === 'home' ? <TableContainer>
          <Table sx={{ maxWidth: 1400 }} className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Rollno</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((item, index) => {
                let rollNo = index + 1
                let name = item.fname.charAt(0).toUpperCase()
                name = name + item.fname.slice(1)
                return (
                  <TableRow key={index}>
                    <TableCell >{rollNo}</TableCell>
                    <TableCell ><Link onClick={() => {
                      getProfile(name).then((res) => { setProfile(res) })
                      setFlag('profile')
                    }} >{name}</Link></TableCell>
                    <TableCell>
                      <Button variant='contained' onClick={() => {
                        getProfile(name).then((res) => {
                          setId(res._id)
                          setEmail(res.email)
                          setfName(res.fname)
                          setContact(res.contact); setProfile(res)
                        })
                        setFlag('edit')
                      }} color='success' style={{ color: 'white' }}>Edit</Button>

                      {item.blocked ? <>
                        <Button variant='contained' sx={{ marginLeft: "15px", width: '8em' }} onClick={() => {
                          setId(item._id)
                          setBlocked(false)
                          handleClickOpen()
                        }}>unblock</Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"This user will be unblocked?"}
                          </DialogTitle>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button color='error' onClick={() => { blockStudent(); handleClose(); window.location.reload(); }} autoFocus>
                              UnBlock
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </> : <>
                        <Button variant='contained' sx={{ marginLeft: "15px", width: '8em' }} onClick={() => {
                          setId(item._id)
                          setBlocked(true)
                          handleClickOpen()
                        }}>block</Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"This user will be blocked?"}
                          </DialogTitle>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button color='error' onClick={() => { blockStudent(); handleClose(); window.location.reload(); }} autoFocus>
                              Block
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>}

                      {/*  */}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer> : ''}


        {flag === 'profile' ? <div className={classes.profileDiv}>
          <Button onClick={() => { setFlag('home') }}>Back</Button>
          <StudentProfile profile={profile} />
        </div> : ''}


        {flag === 'edit' ? <div className={classes.editDiv}>
          <Button onClick={() => { setFlag('home') }} >Back</Button>
          <form onSubmit={updateProfile}>
            <TextField label={'Full Name'} type="text" required={true} onChange={(e) => setfName(e.target.value)} defaultValue={profile.fname} />
            <br />
            <br />
            <TextField label={'Email'} type="text" required={true} onChange={(e) => setEmail(e.target.value)} defaultValue={profile.email} />
            <br />
            <br />
            <TextField label={'Contact'} type="number" required={true} onChange={(e) => setContact(e.target.value)} defaultValue={profile.contact} />
            <br />
            <Button variant='outlined' type='submit'>Submit</Button>
          </form>
        </div> : ''}


      </div>

    </div>
  )
}

export default StudentsT