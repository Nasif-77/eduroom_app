import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import classes from './notes.module.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IsAuth } from '../../../Helpers/hooks/isAuth'


function Notes() {

  useEffect(() => {
    const token = IsAuth()
    const getValue = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/notes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setData(response.data.notes)
      } catch (error) {

      }
    }
    getValue();
  }, [])

  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [flag, setFlag] = useState('home')
  const [filePath, setFilePath] = useState('')
  const [description, setDescription] = useState('')

  return (

    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Notes</h1>
      </nav>
      <div className={classes.mainDiv}>

        {flag === 'home' ? <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Uploaded Date</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell><Button
                      onClick={() => {
                        setFlag('details');
                        setTitle(item.title)
                        setDescription(item.description)
                        setFilePath(item.filePath)
                      }}
                    >{item.title}</Button></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

          </Table>
        </div> : ''}


        {flag === 'details' ? <div>
          <nav>
            <Button onClick={() => setFlag('home')}>Back</Button>
          </nav>
          <div>
            <div>
              <h3>Title:{title}</h3>
              <a href={`${process.env.REACT_APP_SERVER_URL}/${filePath}`}><h4>Download Assignment:<PictureAsPdfIcon /></h4></a>
            </div>
            <div>
              <p>Assignment Details:{description}</p>
            </div>
          </div>
        </div> : ''}



      </div>
    </div>
  )
}

export default Notes