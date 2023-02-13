import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from './attendence.module.css'
import Calendar from 'react-calendar'
import './calender.css'
import { Button } from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment';
import Grid from '@mui/material/Unstable_Grid2/Grid2'

function Attendence() {

  const [user, setUser] = useState({})
  const [absentees, setAbsentees] = useState([]);
  let [totalAbsent, setTotalAbsent] = useState(0)
  let [absentDays, setAbsentDays] = useState('Present');
  const [flag, setFlag] = useState('home');
  const [datee, setDate] = useState(new Date());


  let storage = JSON.parse(localStorage.getItem('user'))
  let name = user.fname
  if (name !== undefined) {
    name = name.charAt(0).toUpperCase()
    name = name + user.fname.slice(1)
  }




  useEffect(() => {


    const getAbsentees = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/attendence`)
        setAbsentees(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getProfile = async () => {
      let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/profile`, {
        params: {
          id: storage.aud
        }
      })
      setUser(response.data)
    }
    getProfile()
    getAbsentees();

  }, [])



  useEffect(() => {
    if (absentees.length !== 0) {
      absentees.map((absentee, item) => {
        absentee.absentees.selectedRows.map((student, index) => {
          if (student === name) {
            setTotalAbsent(totalAbsent++)
          }
        })
      })
    }
    if (totalAbsent > 0) {
      setTotalAbsent(totalAbsent++)
    }
  }, [absentees])



  const checkAbsentees = (date) => {
    for (let i of absentees) {
      if (date.toDateString().slice(0, 3) === 'Sun') {
        setAbsentDays('Holiday')
      }
      else if (i.absentees.date.includes(date.toDateString())) {
        i.absentees.selectedRows.forEach((element) => {
          if (element === name) {
            setAbsentDays('Absent')
          }
        })
        break
      }
      else {
        setAbsentDays('Present')
        continue

      };
    }
  }


  const isLeapYear = (year) => {
    if (year % 4 !== 0) {
      return false;
    } else if (year % 100 !== 0) {
      return true;
    } else if (year % 400 !== 0) {
      return false;
    } else {
      return true;
    }
  }




  let date = Date()
  let month = date.split(' ')[1]
  let day = date.split(' ')[2]
  let year = date.split(' ')[3]

  let DMonth = 30


  const checkMonth = (month) => {
    switch (month) {
      case 'Feb':
        return isLeapYear(year) ? 29 : 28;
      case 'Apr':
      case 'Jun':
      case 'Sep':
      case 'Nov':
        return 30;
      default:
        return 31;
    }
  }


  DMonth = checkMonth(month)

  return (

    <div className={classes.container}>

      <nav className={classes.nav}>
        <h1>{day}/{month}/{year}</h1>
      </nav>

      {flag === 'home' ? <Grid container>

        <Grid xs={12}>
          <div className={classes.calenderDiv}>
            <Calendar onClickDay={checkAbsentees} onChange={setDate} value={datee} />
          </div>

        </Grid>
        <div className={classes.mainDiv}>
          <span style={{ display: 'inline-block' }}>{datee.toDateString()}:<h5 style={{ display: 'inline-block', marginRight: '10px' }}>{absentDays}</h5></span>

          <Button
            onClick={() => setFlag('details')}
            variant='contained'
            endIcon={<AssessmentIcon />}
          >Attendence Report</Button>
        </div>
      </Grid> : ''}


      {flag === 'details' ? <div>
        <Button
          onClick={() => setFlag('home')}>Back</Button>

        <h3>Total number of absent days:{totalAbsent}</h3>
        <h3>Maximum number of present days this month:{DMonth - totalAbsent}</h3>

      </div> : ''}


    </div>
  )
}

export default Attendence