import React from 'react'
import classes from './landingpage.module.css'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'



function LandingStudent() {
    return (
        <div className={`${classes.containerStudent} `}>
            <nav className={`${classes.nav} col-12`}>
                <Typography variant='inherit' fontSize={50} fontWeight={800} sx={{fontVariant:'small-caps'}}>Student?</Typography>
            </nav>

            <div className={classes.innerDiv}>
                    <div className={classes.Card} >
                <Link to='student/login'>
                    <img src="https://studentreasures.com/wp-content/uploads/2020/09/back-view-of-elementary-students-raising-their-hands-on-a-class-picture-id1223141903.jpg" alt="" />
                </Link>
                    </div>
            </div>
        </div>
    )
}

export default LandingStudent