import React, { Children, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../Components/Home-Student/Header'
import classes from './styles.module.css'

function HomeStudent({children}) {
  
  const navigate = useNavigate()
  const loc = useLocation();
  
  useEffect(()=>{
    if(loc.pathname==='/student/home'){
      navigate('/student/home/home')
    }
    let auth =JSON.parse(localStorage.getItem('user'))
    if(auth.position==='tutor'){
      navigate('/tutor/home/home')
    }
  })

 const location= useLocation()
  return (
    <div className={classes.mainDiv}>
        <div className={classes.Header}>
            <Header />
        </div>
        <div className={classes.Content}>
         <Outlet/>  
        </div>
        <div className={classes.Footer}>
          <p>Mobile : 1235467890</p>
        </div>
    </div>
  )
}

export default HomeStudent