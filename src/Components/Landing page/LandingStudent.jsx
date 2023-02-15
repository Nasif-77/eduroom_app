import React from 'react'
import classes from './landingpage.module.css'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@mui/material'



function LandingStudent() {
    return (
        <div className={classes.container}>
            <Link to='student/login'>
                <Card className={classes.Card} sx={{ backgroundImage: 'url(https://studentreasures.com/wp-content/uploads/2020/09/back-view-of-elementary-students-raising-their-hands-on-a-class-picture-id1223141903.jpg)' }}>
                    <CardContent>
                        <p>STUDENT</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default LandingStudent