import axios from 'axios'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import classes from './attendence.module.css'
import Calendar from 'react-calendar'
import './calender.css'
import { Button } from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment';
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import jwtDecode from 'jwt-decode'
import { IsAuth } from '../../../Helpers/hooks/isAuth'

function Attendence() {

  const [user, setUser] = useState({})
  const [absentees, setAbsentees] = useState([]);
  let [absentDays, setAbsentDays] = useState('Present');
  const [flag, setFlag] = useState('home');
  const [datee, setDate] = useState(new Date());
  let totalAbsent = useRef(0)


  let name = user.fname
  if (name !== undefined) {
    name = name.charAt(0).toUpperCase()
    name = name + user.fname.slice(1)
  }




  useEffect(() => {
    const authToken = IsAuth()
    let token = jwtDecode(authToken)
    const getAbsentees = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tutor/home/attendence`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        setAbsentees(response.data.absentees)
      } catch (error) {
      }
    }

    const getProfile = async () => {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/student/home/profile`, {
          params: {
            id: token.aud
          },
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        setUser(response.data.user)
      } catch (error) {

      }

    }
    getProfile()
    getAbsentees();

  }, [])




  useEffect(() => {

    const getAttendence = () => {
      if (absentees.length !== 0) {
        absentees.forEach((absentee) => {
          absentee.absentees.selectedRows.forEach((student) => {
            if (student === name) {
              totalAbsent.current += 1;
            }
          })
        })
      }
    }
    getAttendence()
  }, [absentees, name]
  )



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

        <h3>Total number of absent days:{totalAbsent.current / 2}</h3>
        <h3>Maximum number of present days this month:{DMonth - totalAbsent.current / 2}</h3>

      </div> : ''}


    </div>
  )
}

export default Attendence