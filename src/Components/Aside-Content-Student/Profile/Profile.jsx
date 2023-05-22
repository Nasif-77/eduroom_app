import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from './profile.module.css'
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { IsAuth } from '../../../Helpers/hooks/isAuth'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'



function Profile() {
  const navigate = useNavigate()

  const token = IsAuth()


  const [flag, setFlag] = useState('home')
  const [user, setUser] = useState({})
  const [id, setId] = useState('');




  let name = user.fname
  if (name !== undefined) {
    name = name.charAt(0).toUpperCase()
    name = name + user.fname.slice(1)
  }



  useEffect(() => {
    const token = IsAuth()
    if (!token) navigate('/')
    const decodedToken = jwtDecode(token)
    const getProfile = async () => {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/profile`, {
        params: {
          id: decodedToken.aud
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setUser(response.data.user)
      setId(response.data.user._id)
    }
    getProfile()
  },[navigate])

  const validationSchema = Yup.object({
    fname: Yup
      .string('')
      .min(2, 'Please Enter a valid Name')
      .required('This Field Cannot be empty'),
    email: Yup
      .string()
      .email('Please Enter a Valid E-mail')
      .required('This Field Cannot be empty'),
    contact: Yup
      .string()
      .min(10, 'Please Enter a valid contact number')
      .max(10, 'Please Enter a valid contact number')
      .required('This field cannot be empty')
  })


  const formik = useFormik({
    initialValues: {
      fname: name,
      email: user.email,
      contact: user.contact
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateProfile()
      window.location.reload()
    }
  })

  const updateProfile = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/student/home/profile/${id}`, {
        name: formik.values.fname,
        contact: formik.values.contact,
        email: formik.values.email
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
            formik.initialValues.fname = name
            formik.initialValues.email = user.email
            formik.initialValues.contact = user.contact
            setFlag('edit');
          }} endIcon={<EditIcon />}>Edit</Button>

        </div> : ''}




        {flag === 'edit' ? <div className={classes.editDiv}>
          <Button onClick={() => setFlag('home')}>Back</Button>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              variant='standard'
              label={'Full Name'}
              name={'fname'}
              error={formik.touched.fname && Boolean(formik.errors.fname)}
              helperText={formik.touched.fname && formik.errors.fname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.initialValues.fname}
            />

            <br /><br />
            <TextField label={'E-mail'}
              variant='standard'
              name={'email'}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.contact && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.initialValues.email}

            />

            <br /><br />

            <TextField
              variant='standard'
              name={'contact'}
              error={formik.touched.contact && Boolean(formik.errors.contact)}
              helperText={formik.touched.contact && formik.errors.contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={'number'}
              label={'Contact'}
              defaultValue={formik.initialValues.contact}
            />

            <br /><br />
            <Button type='submit' variant='contained' >Submit</Button>
          </form>

        </div> : ''}
      </div>
    </div>
  )
}

export default Profile