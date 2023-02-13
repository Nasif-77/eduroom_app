// import { Button } from '@mui/material'
import { Button, TextField } from '@mui/material'
import React from 'react'
import classes from './profile.module.css'
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function ProfileT() {

  const [flag, setFlag] = useState('home')
  const [user, setUser] = useState({})
  const [fname, setName] = useState('')
  const [contact, setContact] = useState('')
  const [fieldEmail, setEmail] = useState('');
  const [id, setId] = useState('');






  let profile = JSON.parse(localStorage.getItem('user'))
  let name = user.fname

  if (name !== undefined) {
    name = name.charAt(0).toUpperCase()
    name = name +user.fname.slice(1)
  }


  useEffect(() => {

    const getProfile = async () => {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/profile`, {
        params: {
          id: profile.aud
        }
      })
      setUser(response.data)
      setId(response.data._id)
    }
    getProfile()
  }, [])




  const updateProfile = async () => {
    try {
      let response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/tutor/home/profile/${id}`, {
        name: fname,
        contact: contact,
        email: fieldEmail
      })

    } catch (error) {

    }

  }





  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Profile</h1>
      </nav>

      <div className={classes.mainDiv}>

        {flag === 'home' ? <div className={classes.homeDiv}>
          <div>
            <h2>Fullname:{name}</h2>
            <h2>Email:{user.email}</h2>
            <h2>Position:{user.position}</h2>
            <h2>Contact details:{user.contact}</h2>

          </div>

          <Button variant='contained' onClick={() => {
            setFlag('edit'); setContact(user.contact); setName(user.fname); setEmail(user.email)
          }} endIcon={<EditIcon />}>Edit</Button>
        </div> : ''}


        {flag === 'edit' ? <div className={classes.editDiv}>
          <Button onClick={() => setFlag('home')}>Back</Button>
          <form onSubmit={updateProfile}>
            <TextField label={'Full Name'} required={true} onChange={(e) => setName(e.target.value)} defaultValue={name} />
            <br /><br />
            <TextField label={'E-mail'} required={true} onChange={(e) => setEmail(e.target.value)} defaultValue={user.email} />
            <br /><br />
            <TextField type={'number'} required={true} label={'Contact'} onChange={(e) => setContact(e.target.value)} defaultValue={user.contact} />
            <br /><br />
            <Button type='submit' variant='contained' >Submit</Button>
          </form>

        </div> : ''}



      </div>


    </div>
  )
}

export default ProfileT