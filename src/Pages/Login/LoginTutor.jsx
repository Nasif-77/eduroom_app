import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './login.module.css'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import { Box } from '@mui/system';
import axios from 'axios';


function LoginTutor() {
  const navigate = useNavigate()
  const [fieldEmail, setEmail] = useState("");
  const [login, Setlogin] = useState("")

  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem('user'))
    if (auth) {
      if (auth.position === 'tutor') {
        navigate('/tutor/home')
      }
    }
  })



  //Show/Hide password


  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };




  const sentValue = async (e) => {
    try {
      if (fieldEmail === '' && values.password === '') {
        e.preventDefault()
        Setlogin('Please enter both the fields')
      }
      else if (fieldEmail === '' || values.password === '') {
        e.preventDefault()
        Setlogin('Email or password missing')
      } else {
        let result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/tutor/login`, {
          password: values.password, email: fieldEmail
        })
        if (result.status === 200) {
          Setlogin('')
          localStorage.setItem('token',result.data.token)
          navigate('/tutor/home')
        }

        }
      } catch (error) {
        if (error.response.status === 400 || 401) {
          e.preventDefault()
          Setlogin('Please enter correct details')
        }
      }

    }

  return (
      <div className={classes.login}>
        <Link className={classes.backBtn} to={'/'}><IconButton color='success' ><ArrowBackIcon fontSize='large' /></IconButton></Link>

        <form action=""  >

          <Box
            className={classes.form}
            display={'flex'}
            flexDirection={'column'}
            maxWidth={3000}
            margin={'auto'}
            padding={10}
          >

            <Typography variant={'h4'} fontWeight={'bold'} >
              LOGIN
            </Typography>



            <TextField label={'E-mail'} type={'email'} sx={{ m: 1, width: '30ch' }}
              onChange={(e) => { setEmail(e.target.value) }} variant='standard'
            />

            <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Enter your Password
              </InputLabel>

              <Input
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <Button sx={{ marginTop: '2ch' }} variant='contained' color='success' type='button' endIcon={<LoginIcon />}
              onClick={sentValue}>login</Button>
            <p style={{ color: 'red', textAlign: 'center' }}>{login}</p>
          </Box>
        </form>
      </div>
    )
  }

  export default LoginTutor