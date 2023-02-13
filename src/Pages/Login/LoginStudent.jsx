import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginStudent() {
  const navigate = useNavigate()
  const [fieldEmail, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [login, Setlogin] = useState("")
  const [showPassword, setShowPassword] = React.useState(false);



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem('user'))
    if (auth) {
      if (auth.position === 'student')
        navigate('/student/home')
    }
  })


  const sentValue = async (e) => {
    if (fieldEmail === '' && password === '') {
      e.preventDefault()
      Setlogin('Please enter both the fields')
    }
    else if (fieldEmail === '' || password === '') {
      e.preventDefault()
      Setlogin('Email or password missing')
    }

    let result = await fetch("http://localhost:5000/student/login", {
      method: "POST",
      body: JSON.stringify({ email: fieldEmail, password }),
      headers: { "Content-Type": "application/json" }
    })
    result = await result.json()

    if (result.message === false || result.message === 'password') {
      e.preventDefault()
      Setlogin('Please enter correct details')
    }
    else if (result.message === 'tutor') {
      e.preventDefault()
      Setlogin('You are not a student')
    }
    else if (result.message === 'blocked') {
      e.preventDefault()
      toast.error("Your account is blocked!");
    }
    const token = await jwtDecode(result.token)
    let {  name,position,aud } = token
    let user = { name,position,aud }

    if (user.position === 'student') {

      localStorage.setItem('user', JSON.stringify(user))
      navigate('/student/home')
    } else {
      Setlogin('You are not a Student')
    }

  }

  return (
    <div className={classes.login}>

      <Link className={classes.backBtn} to={'/'}><Button variant='contained' color='inherit' >Back</Button></Link>

      <form action="" className={classes.form}>

        <h1 className={classes.h1} htmlFor=""><strong><i>LOGIN STUDENT</i></strong></h1>

        <TextField label={'E-mail'} sx={{ m: 1, width: '30ch' }}  onChange={(e) => setEmail(e.target.value)} variant='standard' />

        <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button variant='contained' type='button' endIcon={<LoginIcon />} onClick={sentValue} className={classes.button}>login</Button>
        <br />

        <p style={{ color: 'red', fontWeight: 'bold' }}>{login}</p>

        <p className={classes.p}>Don't have an account? <Link to="/student/signup"><Button variant='outlined'>sign up</Button></Link></p>

      </form>

      <div>
        <ToastContainer />
      </div>

    </div>
  )
}

export default LoginStudent