import { Button, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import classes from './assignments.module.css'
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Textarea } from '@mui/joy'
import { IsAuth } from '../../../Helpers/hooks/isAuth'
import { useNavigate } from 'react-router-dom'



function AssignmentsT() {
  const navigate = useNavigate()
  const token = IsAuth()

  useEffect(() => {
    const token = IsAuth()
    if (!token) navigate('/')
    const getValue = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/assignments`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setData(response.data.assignments)
      } catch (error) {

      }
    }
    getValue();
  }, [navigate])



  const [data, setData] = useState([])
  const [file, setFile] = useState([])
  const [filePath, setFilePath] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [flag, setFlag] = useState('home')
  const [id, setId] = useState('')

  let date = Date()
  let month = date.split(' ')[1]
  let year = date.split(' ')[3]
  let day = date.split(' ')[2]
  date = [day, month, year].join('/')





  const sentValues = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file)
      formData.append('date', date)
      formData.append('title', title)
      formData.append('description', description)
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/tutor/home/assignments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })


    } catch (error) {
    }

  }




  const updateAssignment = async () => {
    try {

      await axios.put(`${process.env.REACT_APP_SERVER_URL}/tutor/home/assignments/${id}`, {
        date: date,
        title: title,
        description: description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {

    }
  }


  const updateFile = async () => {
    try {
      const formData = new FormData();
      formData.append('date', date)
      formData.append('file', file)
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/tutor/home/assignments/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {

    }
  }


  const deleteAssignment = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tutor/home/assignments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    } catch (error) {
    }
  }


  //_______________________________________________________________________

  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Assignments</h1>
      </nav>
      <div className={classes.mainDiv}>



        {flag === 'home' ? <div className={classes.homeDiv}>
          <nav>
            <span>Add new assignment</span>
            <AddIcon fontSize='large' color='info' className={classes.addIcon} onClick={() => setFlag('upload')} />
          </nav>

          <br /><br /><br />

          <Table className={classes.Table}>
            <TableHead>
              <TableRow>
                <TableCell>Uploaded date</TableCell>
                <TableCell>title</TableCell>
                <TableCell>Delete Assignment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {item.date}
                    </TableCell>
                    <TableCell>
                      <Button variant='outlined'
                        onClick={() => {
                          setTitle(item.title)
                          setFilePath(item.filePath)
                          setDescription(item.description)
                          setId(item._id)
                          setFlag('details')
                        }}
                      >{item.title}<PictureAsPdfIcon /></Button>
                    </TableCell>

                    <TableCell>
                      <Button onClick={() => {
                        setTitle(item.title); setId(item._id); setFlag('delete')
                      }} variant='contained' color='error'>Delete</Button>
                    </TableCell>

                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

        </div> : ''}



        {flag === 'details' ? <div className={classes.detailsDiv}>
          <nav>
            <Button onClick={() => setFlag('home')}>Back</Button>
            <div>
              <Button variant='contained' color='success' onClick={() => setFlag('edit')}>Edit<EditIcon /></Button>
              <Button variant='contained' color='success' onClick={() => setFlag('edit file')}>Edit File<EditIcon /></Button>
            </div>
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




        {flag === 'upload' ? <div>

          <form action="" onSubmit={sentValues}>
            <CloseIcon onClick={() => setFlag('home')} />
            <br /><br /><br />
            <TextField type="text" label={'Title'} onChange={(e) => { setTitle(e.target.value) }} />
            <br /><br />
            <TextField type="text" label={'Description'} onChange={(e) => { setDescription(e.target.value) }} />
            <br /><br />

            <Button
              sx={{ background: '#009688' }} variant="contained" component="label" >Upload File
              <TextField type="file" hidden onChange={(e) => { setFile(e.target.files[0]) }} />
            </Button>

            <br /><br />
            <Button variant='contained' type='submit' >Save</Button>

          </form>
        </div> : ''}



        {/* ------------------------------------------ */}

        {flag === 'edit' ? <div className={classes.editDiv}>
          <nav>
            <CloseIcon className={classes.closeIcon} onClick={() => setFlag('details')} />
          </nav>

          <form onSubmit={updateAssignment}>
            <TextField label={'Change title'} required={true} type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={title} />
            <br /><br />
            <InputLabel>Description</InputLabel>
            <Textarea label={'Change '} required={true} type="text" onChange={(e) => setDescription(e.target.value)} defaultValue={description} />
            <br /><br />
            <Button variant='contained' type='submit'>Change</Button>
          </form>

        </div> : ''}




        {flag === 'edit file' ? <div>
          <nav>
            <Button onClick={() => setFlag('details')}>Back</Button>
          </nav>
          <div>
            <form onSubmit={updateFile}>

              <Button
                sx={{ background: '#009688' }} variant="contained" component="label" >Upload File
                <TextField type="file" hidden onChange={(e) => { setFile(e.target.files[0]) }} />
              </Button>

              <br /><br /><br />
              <Button type='submit' variant='contained'>Submit</Button>
            </form>
          </div>


        </div> : ''}



        {/* ----------------------------------------   */}

        {flag === 'delete' ? <div className={classes.deleteDiv}>

          <div>
            <form onSubmit={deleteAssignment}>

              <h4>Are you sure to delete this file: <span>{title}</span></h4>
              <br /><br />
              <Button variant='contained' type='submit' sx={{ marginRight: 10 }} color='error'>Ok</Button>
              <Button variant='contained' onClick={() => setFlag('home')} >Cancel</Button>

            </form>
          </div>

        </div> : ''}


      </div>



    </div>
  )
}

export default AssignmentsT