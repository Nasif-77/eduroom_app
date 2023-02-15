import { Button, List, ListItem } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import classes from './assignments.module.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


function Assignments() {
  useEffect(() => {
    const getValue = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/assignments`)
        setData(response.data)
      } catch (error) {

      }
    }
    getValue();
  }, [])


  const[flag,setFlag] = useState('home')
  const [data, setData] = useState([])
  const [filePath, setFilePath] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')



  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Assignment Section</h1>
      </nav>
      <div className={classes.mainDiv}>
        {flag==='home'? <div>

          <h2>All Assignments</h2>
          <List>
            {data.map((item,index)=>{
              return(
                <ListItem sx={{marginBottom:'5px '}} key={index}>{item.date} <Button
                onClick={()=>{
                  setFlag('details')
                  setTitle(item.title)
                  setDescription(item.description)
                  setFilePath(item.filePath)
                }}
                >{item.title}</Button></ListItem>
              )
            })}
            <ListItem></ListItem>
          </List>
        </div> :''}   



        {flag==='details'? <div>
        <nav>
          <Button onClick={()=>setFlag('home')}>Back</Button>
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


          {title}
        </div> : ''}     

      </div>

    </div>
  )
}

export default Assignments