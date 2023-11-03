"use client"
import React from 'react'
import { getCookie,setCookie } from 'cookies-next';
const page = () => {

const btn1=()=>{
        setCookie('key', 'value1111');
    console.log(getCookie('key'))
    console.log('1111111111')
}

  return (
    <div>
        <button onClick={btn1}>1111111111</button>
    </div>
  )
}


export default page