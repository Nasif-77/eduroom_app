import React from 'react'
import classes from './home.module.css'

function HomeT() {
  const date = new Date(Date)
  const day = date.getDay().toLocaleString()
  return (
    <div className={classes.container}>
      
      <div className={classes.mainDiv}>
      
      <h1>Date :{Date().slice(0, 15)}</h1>
      
      </div>

    </div>
  )
}

export default HomeT