import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './announcements.module.css'
import { IsAuth } from '../../../Helpers/hooks/isAuth'

function Announcements() {

  const [announce, setAnnounce] = useState([])
  const [flag, setFlag] = useState('home')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('home')

  useEffect(() => {
    const token = IsAuth()
    let fetchData = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/announcements`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setAnnounce(response.data.announcements)
      } catch (error) {
      }

    }
    fetchData()
  })


  return (
    <div className={classes.container}>

      <nav className={classes.nav}>
        <h1>Announcements</h1>
      </nav>

      <div className={classes.mainDiv}>


        {flag === 'home' ? <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Announced Date</TableCell>
                <TableCell>Subject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announce.map((element, index) => {
                let date = element.date
                let subject = element.subject
                let description = element.description
                let image = element.imageUrl
                return (
                  <TableRow key={index}>
                    <TableCell>{date}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setFlag('details')
                          setSubject(subject)
                          setDate(date)
                          setDescription(description)
                          setImageUrl(image)
                        }}
                      >{subject}</Button>
                    </TableCell>
                  </TableRow>)
              })}
            </TableBody>
          </Table>
        </div> : ''}


        {flag === 'details' ? <div>
          <Button onClick={() => setFlag('home')}>
            Back
          </Button>
          <div>
            <h2>Subject:<u>{subject}</u></h2>
            <h4>Announced Date:{date}</h4>
            <div>
              <p>{description}</p>
            </div>

            <div>
              <img src={`${process.env.REACT_APP_SERVER_URL}/${imageUrl}`} alt="" />
            </div>

          </div>

        </div> : ''}

      </div>

    </div>
  )
}

export default Announcements