import { Button, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import classes from './events.module.css'
import { DatePicker, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react'
import { Textarea } from '@mui/joy'


function EventsT() {

  const [event, setEvent] = useState('')
  const [club, setClub] = useState('')
  const [description, setDescription] = useState('')

  const [value, setValue] = useState(Date());
  const [date, setDate] = useState(dayjs(Date()))
  const [data, setData] = useState([])
  const [flag, setFlag] = useState('home')
  const [id, setId] = useState('')
  const [details, setDetails] = useState({});



  console.log(date)

  useEffect(() => {
    const getValue = async () => {
      setDate(date.$d.toString().slice(4, 15))
      try {
        const response = await axios.get("http://localhost:5000/tutor/home/events")
        setData(response.data)
      } catch (error) {

      }
    }
    getValue();
  }, [])


  const handleChange = (newValue) => {
    setValue(newValue);

    setDate(newValue.$d.toString().slice(3, 15))
  };

  console.log(date)

  const fetchValue = async () => {
    try {
      let response = await axios.post('http://localhost:5000/tutor/home/events', {
        event: event,
        club: club,
        description: description,
        date: date
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }




  const updateEvent = async () => {
    try {
      let response = await axios.patch("http://localhost:5000/tutor/home/events", {
        event: event,
        club: club,
        date: date,
        description: description,
        id: id
      })
      console.log(response)
    } catch (error) {

    }
  }



  const deleteEvent = async () => {
    try {
      console.log(id)
      let response = await axios.delete(`http://localhost:5000/tutor/home/events/${id}`)

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Events</h1>
      </nav>
      <div className={classes.mainDiv}>

        {flag === 'home' ? <div>
          <form action="" onSubmit={fetchValue}>
            <br />
            <TextField label={'Event'} type="text" placeholder={""} required={true} onChange={(e) => setEvent(e.target.value)} />
            <br /><br />
            <br />
            <TextField label={'Conducted by'} type="text" placeholder={""} required={true} onChange={(e) => setClub(e.target.value)} />
            <br /><br />
            <br />
            <TextField label={'Description'} type="text" placeholder={""} required={true} onChange={(e) => setDescription(e.target.value)} />
            <br /><br />
            <br />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                inputFormat='DD/MM/YYYY'
                value={value}
                required={true}
                onChange={(newValue) => {
                  setValue(newValue);
                  setDate(newValue===null? date : newValue.$d.toString().slice(3, 15))
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>


            <br /><br />
            <Button type='submit' variant='contained'>Save</Button>
          </form>
          <br /><br /><br />
          <Button onClick={() => setFlag('all')}>Show all event</Button>
        </div> : ''}

        {flag === 'all' ? <div>
          <Button onClick={() => setFlag('home')}>Back</Button>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Club</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((element, index) => {
                let date = element.date
                let event = element.event
                let club = element.club
                let description = element.description
                return (
                  <TableRow key={index}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{club}</TableCell>
                    <TableCell><Button onClick={() => {
                      setDetails(element); setFlag('details')
                    }}>{event}</Button></TableCell>
                    <TableCell><Button onClick={() => {
                      setDate(date); setEvent(event); setClub(club); setDescription(description); setFlag('edit'); setId(element._id)
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



        {flag == 'details' ? <div>
          <Button onClick={() => setFlag('all')}>Back</Button>
          <h2>Event:{details.event}</h2>
          <h2>Club:{details.club}</h2>
          <h5>Date:{details.date}</h5>
          <p>Description:{details.description}</p>
        </div> : ''}


        {flag === 'edit' ? <div>
          <Button onClick={() => setFlag('all')}>Back</Button>
          <form onSubmit={updateEvent}>
            <TextField label={'Change subject'} required={true} type="text" onChange={(e) => setEvent(e.target.value)} defaultValue={event} />
            <br /><br />
            <TextField label={'Change club'} required={true} type="text" onChange={(e) => setClub(e.target.value)} defaultValue={club} />
            <br /><br />
            <InputLabel>Description</InputLabel>
            <Textarea label={'Change Description'} required={true} type="text" onChange={(e) => setDescription(e.target.value)}
              defaultValue={description} />
            <br /><br />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={'Date'}
                inputFormat="DD/MM/YYYY"
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br /><br /><br />
            <Button variant='contained' type='submit'>Change</Button>
          </form>
        </div> : ''}



        {flag === 'delete' ? <div>
          <form onSubmit={deleteEvent}>

            <p>the following announcement would be deleted {details.event}</p>
            <br /><br />
            <Button variant='contained' onClick={() => setFlag('all')}>Cancel</Button>
            <Button variant='contained' color='error' type='submit'>Ok</Button>
          </form>
        </div> : ''}



      </div>
    </div>)
}

export default EventsT