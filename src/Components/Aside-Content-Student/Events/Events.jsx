import axios from 'axios'
import classes from './events.module.css'
import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';


function Events() {


    const [data, setData] = useState([])
    const [flag, setFlag] = useState('home')
    const [details, setDetails] = useState({});





    useEffect(() => {
        const getValue = async () => {
            try {
                const response = await axios.get("http://localhost:5000/student/home/events")
                setData(response.data)
            } catch (error) {

            }
        }
        getValue();
    }, [])



    return (
        <div className={classes.container}>

            <nav className={classes.nav}>
                <h1>Events</h1>
            </nav>

            <div className={classes.mainDiv}>
                {flag === 'home' ? <div>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Club</TableCell>
                                    <TableCell>Event</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((element, index) => {
                                    let date = element.date
                                    let event = element.event
                                    let club = element.club
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{date}</TableCell>
                                            <TableCell>{club}</TableCell>
                                            <TableCell><Button onClick={() => {
                                                setDetails(element); setFlag('details')
                                            }}>{event}</Button></TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div> : ''}
                
                {flag == 'details' ? <div>
                    <Button onClick={() => setFlag('home')}>Back</Button>
                    <h2>Event:{details.event}</h2>
                    <h2>Club:{details.club}</h2>
                    <h5>Date:{details.date}</h5>
                    <p>Description:{details.description}</p>
                </div> : ''}
                
                
            </div>

        </div>
    )
}

export default Events