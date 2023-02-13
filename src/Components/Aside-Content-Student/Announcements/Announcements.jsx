import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './announcements.module.css'

function Announcements() {

  const [announce, setAnnounce] = useState([])
  const [flag, setFlag] = useState('home')
  const [subject, setSubject] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('home')

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:5000/student/home/announcements")
        let data = response.data
        setAnnounce(data)
      } catch (error) {
        console.log(error)
      }

    }
    fetchData()
  }, [])


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
                      onClick={()=>{
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


        {flag==='details' ?  <div>
          <Button onClick={()=>setFlag('home')}>
            Back
            </Button>
            <div>
              <h2>Subject:<u>{subject}</u></h2>
              <h4>Announced Date:{date}</h4>
              <div>
                <p>{description}</p>
              </div>

              <div>
              <img src={`http://localhost:5000/${imageUrl}` }alt="" width={600}/>
              </div>

            </div>

        </div> : ''}

      </div>

    </div>
  )
}

export default Announcements