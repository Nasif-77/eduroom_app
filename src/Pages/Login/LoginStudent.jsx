import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

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
    let auth = localStorage.getItem('token')
    if (auth) {
      const token = jwtDecode(auth)
      if (token.position === 'student')
        navigate('/student/home')
    }
  })


  const sentValue = async (e) => {
    try {
      if (fieldEmail === '' && password === '') {
        e.preventDefault()
        Setlogin('Please enter both the fields')
      }
      else if (fieldEmail === '' || password === '') {
        e.preventDefault()
        Setlogin('Email or password missing')
      }

      let result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/student/login`, { email: fieldEmail, password }
      )

      if (result.status === 200) {
        Setlogin('')
        localStorage.setItem('token',result.data.token)
        navigate('/student/home')
      }



    } catch (error) {

      if (error.response.status === 400) {
        e.preventDefault()
        Setlogin('Please enter correct details')
      }
      else if (error.response.status === 401) {
        e.preventDefault()
        toast.error("Your account is blocked!");
      }
    }


  }

  return (

    <div className={classes.login}>

      <Link className={classes.backBtn} to={'/'}><IconButton color='success' ><ArrowBackIcon fontSize='large' /></IconButton></Link>

      <form action="" >

        <Box
          className={classes.form}
          display={'flex'}
          flexDirection={'column'}
          maxWidth={3000}
          margin={'auto'}
          padding={10}
        >

          <Typography variant='h4' fontWeight={'bold'}>
            LOGIN
          </Typography>

          <TextField label={'E-mail'} type={'email'} sx={{ m: 1, width: '30ch' }}
            onChange={(e) => setEmail(e.target.value)} variant='standard' />

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

          <Button sx={{ marginTop: '2ch' }} variant='contained' color='success' type='button' endIcon={<LoginIcon />} onClick={sentValue} >login</Button>
          <br />

          <p style={{ color: 'red', textAlign: 'center' }}>{login}</p>

          <p className={classes.p}>Don't have an account? <Link to="/student/signup"><Button size='large' sx={{ fontWeight: '900', padding: '0px', textTransform: 'inherit' }} variant='text'>Sign up</Button></Link></p>
        </Box>

      </form>

      <div>
        <ToastContainer />
      </div>

    </div>
  )
}

export default LoginStudent