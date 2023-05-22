import { Textarea } from '@mui/joy';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import classes from './announcement.module.css'
import { IsAuth } from '../../../Helpers/hooks/isAuth';
import { useNavigate } from 'react-router-dom';


function AnnouncementsT() {
  const navigate = useNavigate()

  const token = IsAuth()


  const [subject, setSubject] = useState('');
  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState([]);
  const [details, setDetails] = useState({});
  const [flag, setFlag] = useState('home')
  const [id, setId] = useState('')


  useEffect(() => {
    const token = IsAuth()
    if (!token) navigate('/')
    const getValue = async () => {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/announcements`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setData(response.data.announcements)
    }
    getValue()
  }, [navigate])

  let date = Date()
  let month = date.split(' ')[1]
  let year = date.split(' ')[3]
  let day = date.split(' ')[2]
  date = [month, day, year].join(' ')



  const sentValue = async () => {
    try {
      const formdata = new FormData();
      formdata.append('subject', subject)
      formdata.append('description', description)
      formdata.append('file', file)
      formdata.append('date', date)

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/tutor/home/announcements`, formdata, {
        headers: {
          'Content-Type': "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
    }

  }


  const updateAnnouncement = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/tutor/home/announcements`, {
        subject: subject,
        date: date,
        description: description,
        id: id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {

    }
  }


  const deleteAnnouncement = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tutor/home/announcements/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    } catch (error) {
    }
  }


  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Announcements</h1>
      </nav>
      <div className={classes.mainDiv}>


        {flag === 'home' ? <div>
          <form onSubmit={sentValue} className={classes.form}>
            <h2>Subject</h2>
            <TextField type="text" required={true} onChange={(e) => { setSubject(e.target.value) }} className={classes.subject} />
            <br /><br />


            <h3>Description</h3>
            <Textarea sx={{ maxWidth: '74ch' }} required={true} onChange={(e) => { setDescription(e.target.value) }}  ></Textarea>
            <h4>Attatchments</h4>
            <Button
              sx={{ background: '#009688' }} variant="contained" component="label" >Upload File
              <input type="file" required={true} hidden onChange={(e) => { setFile(e.target.files[0]) }} />
            </Button>

            <br /><br />
            <Button type='submit' variant='contained'>Save</Button>
          </form>
          <Button onClick={() => setFlag('all')}>Show previous announcements</Button>
        </div> : ''}



        {flag === 'all' ? <div>
          <Button onClick={() => setFlag('home')}>Back</Button>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((element, index) => {
                let date = element.date
                let subject = element.subject
                return (
                  <TableRow key={index}>
                    <TableCell>{date}</TableCell>
                    <TableCell><Button onClick={() => {
                      setDetails(element); setFlag('details')
                    }}>{subject}</Button></TableCell>
                    <TableCell><Button onClick={() => {
                      setSubject(element.subject); setDescription(element.description); setFlag('edit'); setId(element._id)
                    }} color='success'>Edit</Button></TableCell>
                    <TableCell><Button onClick={() => {
                      setDetails(element);

                      setFlag('delete'); setId(element._id)
                    }} color='error'>Delete</Button></TableCell>
                  </TableRow>)
              })}
            </TableBody>
          </Table>
        </div> : ''}




        {flag === 'details' ? <div className={classes.detailsDiv}>
          <Button onClick={() => setFlag('all')}>Back</Button>
          <h2>Title:{details.subject}</h2>
          <h5>Date:{details.date}</h5>
          <p>More Information:
            <br /><br />
            {details.description}</p>
          <img src={`${process.env.REACT_APP_SERVER_URL}/${details.imageUrl}`} alt="" width={700} />
        </div> : ''}


        {flag === 'edit' ? <div>
          <Button onClick={() => setFlag('all')}>Back</Button>
          <br /><br />
          <form onSubmit={updateAnnouncement}>
            <TextField className={classes.subject} label={'Change subject'} required={true} type="text" onChange={(e) => setSubject(e.target.value)} defaultValue={subject} />
            <br /><br />
            <br /><br />
            <Textarea sx={{ maxWidth: '76ch' }} label={'Change Description'} required={true} type="text" onChange={(e) => setDescription(e.target.value)}
              defaultValue={description} />
            <br /><br />
            <Button variant='contained' type='submit'>Change</Button>
          </form>
        </div> : ''}



        {flag === 'delete' ? <div>
          <form onSubmit={deleteAnnouncement}>

            <p>the following announcement would be deleted {details.subject}</p>
            <br /><br />
            <Button variant='contained' onClick={() => setFlag('all')}>Cancel</Button>
            <Button variant='contained' color='error' type='submit'>Ok</Button>
          </form>
        </div> : ''}
      </div>
    </div>
  )
}

export default AnnouncementsT