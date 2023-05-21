import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../Components/Home-Student/Header'
import classes from './styles.module.css'
import jwtDecode from 'jwt-decode'

function HomeStudent() {

  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/student/home') {
      navigate('/student/home/home')
    }
    let auth = localStorage.getItem('token')
    if (auth) {
      const token = jwtDecode(auth)
      if (token.position === 'tutor') {
        navigate('/tutor/home/home')
      }
    } else {
      navigate('/login')
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

export default HomeStudent