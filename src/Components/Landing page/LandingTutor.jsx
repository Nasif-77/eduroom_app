import React from 'react'
import classes from './landingpage.module.css'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@mui/material'


function LandingTutor() {
    return (
        <div className={classes.container}>
            <Link to="tutor/login">
                <Card className={classes.Card} sx={{ backgroundImage: 'url(https://internationalteacherstraining.com/blog/wp-content/uploads/2017/07/20.03.2020-10-Essential-Needs-for-Teacher-Training-1200x675-cropped.jpg)' }}>
                    <CardContent>
                        <p>TUTOR</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default LandingTutor