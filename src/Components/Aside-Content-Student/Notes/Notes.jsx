import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import classes from './notes.module.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


function Notes() {

  useEffect(() => {
    const getValue = async () => {
      try {
        const response = await axios.get("http://localhost:5000/student/home/notes")
        setData(response.data)
        console.log(response.data)
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
                  <TableRow>
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
              <a href={`http://localhost:5000/${filePath}`}><h4>Download Assignment:<PictureAsPdfIcon /></h4></a>
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