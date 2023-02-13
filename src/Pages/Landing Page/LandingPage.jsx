import React from 'react'
import classes from './landingpage.module.css'
import LandingStudent from '../../Components/Landing page/LandingStudent'
import LandingTutor from '../../Components/Landing page/LandingTutor'

function LandingPage() {


    return (
        <div className={classes.container}>
            <nav className={classes.landingPageHead}>
                <p>Which One Are You?</p>
            </nav>
            <div className={classes.mainDiv}>
            <LandingTutor />
            <LandingStudent />
            </div>
        </div>
    )
}

export default LandingPage