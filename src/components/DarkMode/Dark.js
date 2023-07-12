'use client'
import { useState, useEffect } from "react"
import Icon from '@mdi/react';
import { mdiBrightness4 } from '@mdi/js';
import { mdiBrightness6 } from '@mdi/js';

const DarkMode = ()=>{
    // Whenever the user explicitly chooses to respect the OS preference
    //   localStorage.removeItem('theme')
    const [darkmode, setDarkmode]= useState('dark')
    const handleChangeMode = ()=>{
        console.log('mode '+ darkmode)
        if (darkmode === 'dark'){
            setDarkmode('light')
        } else{
            setDarkmode('dark')
        }
        if (darkmode === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
    useEffect(()=>{
        console.log('mode: '+darkmode)
    },[darkmode])
    return(
        <>
            {darkmode === 'light'?
            <Icon path={mdiBrightness4} size={1} color='white' onClick={()=>handleChangeMode()}/>:
            <Icon path={mdiBrightness6} size={1} color='yellow'onClick={()=>handleChangeMode()}/>}
        </>
    )
}
export default DarkMode
