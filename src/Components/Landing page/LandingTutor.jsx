import React from 'react'
import classes from './landingpage.module.css'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'


function LandingTutor() {
    return (
        <div className={`${classes.containerTutor}`}>
            <nav>
                <Typography variant='inherit' fontSize={50} fontWeight={800} sx={{ fontVariant: 'small-caps' }} >Tutor?</Typography>
            </nav>

            <div className={classes.innerDiv}>
                <div className={classes.Card} >
                    <Link to="tutor/login">
                        <img src="/Images/1.png" alt="" />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default LandingTutor