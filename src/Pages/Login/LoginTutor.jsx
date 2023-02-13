import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from './login.module.css'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button ,IconButton,Input,InputAdornment,InputLabel,TextField } from '@mui/material';

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
    if (fieldEmail === '' && values.password === '') {
      e.preventDefault()
      Setlogin('Please enter both the fields')
    }
    else if (fieldEmail === '' || values.password === '') {
      e.preventDefault()
      Setlogin('Email or password missing')
    } else {


      let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/tutor/login`, {
        method: "POST",
        body: JSON.stringify({ password:values.password, email: fieldEmail }),
        headers: { "Content-Type": "application/json" }
      })
      result = await result.json()
      if (result.message === false) {
        e.preventDefault()
        Setlogin('Email or password does not match')
      } else {
        const token = await jwtDecode(result.token)
        let { name, email, contact, position,aud } = token
        let user = { name, email, contact, position,aud }
        if (user) {
          if (user.position === 'tutor') {
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/tutor/home')
          } else {
            Setlogin("You are not a tutor")
          }
        }
      }
    }
  }

  return (
    <div className={classes.login}>
      <Link className={classes.backBtn} to={'/'}><Button variant='contained' color='inherit' >Back</Button></Link>
      <form action="" className={classes.form} >
        <h1 className={classes.head1}><strong><i>LOGIN TUTOR</i></strong></h1>

        <InputLabel htmlFor="standard-adornment-password">
        Enter your Email
      </InputLabel>
        
        <Input label="Enter Your email" type="text" onChange={(e) => { setEmail(e.target.value) }} className={classes.input} required={true} />
        <br />

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
        <br />
        <Button variant='contained' type='button' className={classes.button} onClick={sentValue}>login</Button>
        <p style={{ color: 'red', fontWeight: 'bold' }}>{login}</p>
        <p className={classes.p}>Don't have an account? <br />
          <Link to="/tutor/signup"><Button variant='contained' color='success'>sign up</Button></Link>
        </p>
      </form>
    </div>
  )
}

export default LoginTutor