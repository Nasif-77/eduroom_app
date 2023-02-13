import React, { useEffect, useState } from 'react'
import classes from './signup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, FormHelperText } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field, useFormik } from 'formik';
import { BallTriangle } from 'react-loader-spinner';
import {validationSchema} from '../../Validation/Validation'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';



function SignupStudent() {

  const navigate = useNavigate();


  const [fieldEmail, setEmail] = useState('');
  const [fieldPosition] = useState('student');
  const [blocked] = useState(false);
  const [otp, setOtp] = useState('')
  const [flag, setFlag] = useState('home')
  const [check, setCheck] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };



  

  const formik = useFormik({
    initialValues: {
      fname: '',
      email: '',
      password: '',
      confirmPassword: '',
      contact: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sentValues()
    },
  });



  useEffect(() => {
    let auth = localStorage.getItem('user')
    if (auth) {
      navigate('/student/home')
    }
  })


  const sentOtp = async () => {
    try {
      setFlag('loading')
      let result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/student/otp`, {
        otp: otp,
        fname: formik.values.fname,
        email: formik.values.email,
        password: formik.values.password,
        contact: formik.values.contact,
        position: fieldPosition,
        blocked: blocked
      })
      result = result.data
      const token = await jwtDecode(result.token)
      let { name, email, contact, position, aud } = token
      let user = { name, email, contact, position, aud }
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/student/home')
    } catch (error) {
      setFlag('home')
      toast('Your Otp is Wrong')
    }

  }



  const sentValues = async (e) => {
    try {
      setFlag('otp')
      let result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/student/signup`, {
        contact: formik.values.contact,
        email: formik.values.email
      })
    } catch (error) {

    }

  }


  return (





    <div className={classes.container}>

      <div className={classes.mainDiv}>

        {flag === 'home' ? <section className={classes.sectionOne}>

          <Button id={classes["backBtn"]}><Link to={'/student/login'}>Back</Link></Button>

          <form className={classes.form} action=" " onSubmit={formik.handleSubmit}  >

            <fieldset>

              <legend><center><h2><b>Sign Up</b></h2></center></legend><br />

              <TextField label='Full Name'
                name='fname'
                id='fname'
                variant='standard'
                value={formik.values.fname}
                error={formik.touched.fname && Boolean(formik.errors.fname)}
                helperText={formik.touched.fname && formik.errors.fname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <br />
              <TextField
                label='Email'
                name='email'
                id='email'
                type={'email'}
                variant='standard'
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <br />

              <FormControl className={classes.FormControl} sx={{ width: '35ch' }} variant="standard">
                <InputLabel className={classes.InputLabel} htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  className={classes.Input}
                  name='password'
                  id='password'
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
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
                <FormHelperText className={classes.FormHelperText} sx={{ color: 'red' }}>{formik.touched.password && formik.errors.password}</FormHelperText>
              </FormControl>

              <br />

              <FormControl className={classes.FormControl} sx={{ width: '35ch' }} variant="standard">
                <InputLabel className={classes.InputLabel} htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                <Input
                  className={classes.Input}
                  name='confirmPassword'
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={showCPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCPassword}
                        onMouseDown={handleMouseDownCPassword}
                      >
                        {showCPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText  sx={{ color: 'red' }}>{formik.touched.confirmPassword && formik.errors.confirmPassword}</FormHelperText>
              </FormControl>



              <p style={{ color: 'red' }}>{check}</p>

              <TextField
                type={'number'}
                label={'Contact No:'}
                variant='standard'
                name='contact'
                id='contact'
                value={formik.values.contact}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <br /><br /><br />
              <Button type='submit' >Create Account</Button>

            </fieldset>

          </form>

        </section> : ''}


        {flag === 'otp' ? <div>
          <form action="">
            <h1>Enter the otp</h1>
            <Input type={'number'} placeholder={'******'} onChange={(e) => setOtp(e.target.value)} />
            <br />
            <Button onClick={sentOtp}>Submit</Button>
          </form>
        </div> : ''}


        {flag === 'loading' ? <div>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />

          <h3>Please wait....</h3>
        </div> : ''}

        <div>
          <ToastContainer />
        </div>

      </div>


    </div>


  )
}

export default SignupStudent