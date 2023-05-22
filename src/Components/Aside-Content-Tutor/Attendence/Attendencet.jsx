import { useState } from 'react';
import Calendar from 'react-calendar'
import classes from './attendence.module.css'
import './calender.css'
import { useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Checkbox } from '@mui/joy';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { IsAuth } from '../../../Helpers/hooks/isAuth';
import { useNavigate } from 'react-router-dom';

function AttendenceT() {
  const navigate = useNavigate()


  const [data, setData] = useState([])
  const [student, setStudent] = useState([])
  const [date, setDate] = useState(new Date());
  const [selectedRows, setSelectedRows] = useState([]);
  const [absentees, setAbsentees] = useState({});
  const [absentStudents, setAbsentStudents] = useState([]);
  const [flag, setFlag] = useState('home');


  useEffect(() => {
    const token = IsAuth()
    if (!token) navigate('/')
    const getStudents = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/students`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setStudent(response.data.students)
      } catch (error) {
      }
    }

    const getAbsentees = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/attendence`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setData(response.data.absentees)
      } catch (error) {
      }
    }
    getStudents();
    getAbsentees();
  }, [navigate])



  const checkAbsentees = (date) => {
    for (let i of data) {
      if (i.absentees.date.includes(date.toDateString())) {
        setAbsentStudents(i.absentees.selectedRows)
        break
      }
      else {
        setAbsentStudents(['No absentees found']);
        continue

      };
    }
    // data.forEach((item) => {
    //   if (item.absentees.date == date.toDateString()) {
    //     console.log('item,date')
    //     setAbsentStudents(item.absentees.selectedRows)
    //   }else {
    //     console.log('google',item);
    //     setAbsentStudents(['No absentees found']);
    //   }
    // })
  }


  const handleCheckboxChange = (e, name) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, name]);
    } else {
      setSelectedRows(selectedRows.filter(row => row !== name));
    }
  };


  const sentValue = () => {
    setAbsentees(() => ({ selectedRows, date: date.toDateString() }))
  }


  useEffect(() => {
    if (absentees.selectedRows) {
      const sentData = async () => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/tutor/home/attendence`, {
          absentees: absentees
        })
      }
      sentData()
    }
  }, [absentees])

  //------------------------------------------
  return (


    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Attendence</h1>
      </nav>

      <div className={classes.mainDiv}>

        <Grid container>

          <Grid xs={12}>
            <div className={classes.calendarDiv}>
              <Calendar calendarType='ISO 8601' onClickDay={checkAbsentees} onChange={setDate} value={date} />
            </div>
          </Grid>

        </Grid>


        {flag === 'home' ? <div>
          <Button onClick={() => { setFlag('mark') }}>Mark absentees</Button>
          <h2><u>Absentees</u></h2>

          <ul>
            {absentStudents.map((items, index) => {
              return (
                <li key={index}>{items}</li>
              )
            })}

          </ul>

        </div> : ''}




        {flag === 'mark' ? <div>
          <Button onClick={() => setFlag('home')}>Back</Button>
          <br /><br /><br />
          <form onSubmit={sentValue} >

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '' }}>Select</TableCell>
                  <TableCell sx={{ width: '5em' }}>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {student.map((row, index) => {
                  let name = row.fname.charAt(0).toUpperCase()
                  name = name + row.fname.slice(1)
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          color='primary'
                          checked={selectedRows.includes(name)}
                          onChange={e => handleCheckboxChange(e, name)}
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>

            </Table>

            <Button variant='contained' type='submit'>Submit</Button>

          </form>

        </div> : ''}


      </div>

    </div>
  )
}

export default AttendenceT