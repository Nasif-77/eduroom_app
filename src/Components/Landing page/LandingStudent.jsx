import React from 'react'
import classes from './landingpage.module.css'
import { Link } from 'react-router-dom'



function LandingStudent() {
    return (
        <div className={classes.container}>
            <div className={classes.Card}>
            <Link to='student/login'>
                <p>STUDENT</p>
            <img src='Images/graduated-student-in-simple-flat-vector-42348795.webp' alt=""/>
            </Link>
            </div>
        </div>
    )
}

export default LandingStudent