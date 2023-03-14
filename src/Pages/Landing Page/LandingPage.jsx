import React from 'react'
import classes from './landingpage.module.css'
import LandingStudent from '../../Components/Landing page/LandingStudent'
import LandingTutor from '../../Components/Landing page/LandingTutor'
import { Typography } from '@mui/material'

function LandingPage() {


    return (
        <div className={classes.container}>

            <nav className={classes.landingPageHead}>
                <Typography variant='body1' style={{ fontSize: '50px', fontWeight: 700 }} >
                    Tutor or Student?
                </Typography>
            </nav>

            <div className={classes.mainDiv}>


               <LandingStudent />

                <LandingTutor /> 



            </div>

        </div>
    )
}

export default LandingPage