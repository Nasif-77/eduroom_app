import { Button, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import React from 'react'
import classes from './notesT.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Textarea } from '@mui/joy'





function NotesT() {

  useEffect(() => {
    const getValue = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/notes`)
        setData(response.data)
      } catch (error) {

      }
    }
    getValue();
  }, [])

  const [data, setData] = useState([])
  const [file, setFile] = useState([])
  const [flag, setFlag] = useState('home')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [filePath, setFilePath] = useState('')
  const [id, setId] = useState('')

  let date = Date()
  let month = date.split(' ')[1]
  let year = date.split(' ')[3]
  let day = date.split(' ')[2]
  date = [day, month, year].join('/')



  const sentValues = async () => {
    try {
      const formData = new FormData();
      formData.append('date', date)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('file', file)
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/tutor/home/notes`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })


    } catch (error) {
    }
  }


  const updateNotes = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/tutor/home/notes/${id}`, {
        title: title,
        description: description,
        date: date
      })
    } catch (error) {

    }
  }

  const updateFile = async () => {
    try {
      const formData = new FormData();
      formData.append('date', date)
      formData.append('file', file)
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/tutor/home/notes/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
    } catch (error) {

    }
  }


  const deleteNotes = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tutor/home/notes/${id}`)

    } catch (error) {
    }
  }

  return (


    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Notes</h1>
      </nav>

      <div className={classes.mainDiv}>

        {/* ---------------------------------------------------------- */}

        {flag === 'home' ? <div className={classes.homeDiv}>
          <nav>
            <span>Add new Note</span>
            <AddIcon fontSize='large' color='info' className={classes.addIcon} onClick={() => setFlag('upload')} />
          </nav>
          <div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell variant='head'>Uploaded Date  </TableCell>
                  <TableCell variant='head'>Title</TableCell>
                  <TableCell variant='head' >Delete Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => {
                  return (
                    <TableRow key={index}>

                      <TableCell variant='body'>
                        {item.date}
                      </TableCell>

                      <TableCell variant='body'>
                        <Button variant='outlined'
                          onClick={() => {
                            setTitle(item.title)
                            setDescription(item.description)
                            setId(item._id)
                            setFlag('details')
                            setFilePath(item.filePath)
                          }}
                        >{item.title}<PictureAsPdfIcon /></Button>
                      </TableCell>

                      <TableCell variant='body'>
                        <Button onClick={() => {
                          setTitle(item.title); setId(item._id); setFlag('delete')
                        }} variant='contained' color='error'>Delete</Button>
                      </TableCell>

                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div> : ''}



        {/* ---------------------------------------------------------- */}


        {flag === 'details' ? <div className={classes.detailsDiv}>
          <nav>

            <Button variant='contained' color='success' onClick={() => setFlag('edit')}>Edit Details<EditIcon /></Button>
            <br /><br />
            <Button variant='contained' color='success' onClick={() => setFlag('edit file')}>Edit File<EditIcon /></Button>
          </nav>
          <div>
            <div>
              <h3>Title:{title}</h3>
              <a href={`${process.env.REACT_APP_SERVER_URL}/${filePath}`}><h4>Download Note:<PictureAsPdfIcon /></h4></a>
            </div>
            <div>
              <p>Note Details:{description}</p>
            </div>
          </div>

        </div> : ''}



        {/* ---------------------------------------------------------- */}



        {flag === 'upload' ? <div>
          <CloseIcon onClick={() => setFlag('home')} />
          <br /><br /><br />
          <form action="" onSubmit={sentValues}>
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


        {/* ---------------------------------------------------------- */}




        {flag === 'edit' ? <div className={classes.updateDiv}>
          <nav>
            <CloseIcon className={classes.closeIcon} onClick={() => setFlag('details')} />
          </nav>

          <form onSubmit={updateNotes}>
            <TextField label={'Change title'} required={true} type="text" onChange={(e) => setTitle(e.target.value)} defaultValue={title} />
            <br /><br />
            <InputLabel>Description</InputLabel>
            <Textarea label={'Change '} required={true} type="text" onChange={(e) => setDescription(e.target.value)} defaultValue={description} />
            <br />
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



        {/* ---------------------------------------------------------- */}

        {flag === 'delete' ? <div className={classes.deleteDiv}>
          <div>
            <form onSubmit={deleteNotes}>

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

export default NotesT