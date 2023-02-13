import React from 'react'
import classes from './landingpage.module.css'
import { Link } from 'react-router-dom'


function LandingTutor() {
    return (
        <div className={classes.container}>
            <div className={classes.Card}>
                <Link to="tutor/login">
                <p>TUTOR</p>
                    <img src={'Images/professor-vector-38367228.webp'} alt="" />
                </Link>
            </div>
        </div>
    )
}

export default LandingTutor