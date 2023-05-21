import React, { useEffect } from 'react'
import Header from '../../Components/Home-Tutor/Header'
import classes from './styles.module.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'


function HomeTutor() {

  let location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/tutor/home') {
      navigate('/tutor/home/home')
    }
    let auth = localStorage.getItem('token')
    const token = jwtDecode(auth)
    if (token.position === 'student') {
      navigate('/home-student/home')
    }
  })
  return (
    <div className={classes.mainDiv}>
      <div className={classes.Header}>
        <Header />
      </div>
      <div className={classes.Content}>
        <Outlet />
      </div>
      <div className={classes.Footer}>
        <p>Mobile : 1235467890</p>
      </div>
    </div>
  )
}

export default HomeTutor