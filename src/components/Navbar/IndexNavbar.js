"use client"
import React,{useEffect} from "react";
import Link from "next/link";
import Burger from "./Burger.js";
import DarkMode from '@/components/DarkMode/Dark.js'
import { useAuth } from '@/context/authContext'
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import {alertConfirmacion} from '@/components/Reusables/Alerts'
import {useRouter} from 'next/navigation'


export default function Navbar(props) {
  const router = useRouter()
  const {user, logout} = useAuth()
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  useEffect(()=>{
    // setTimeout(()=>{
    //   // espera 9 segundos para que cargen los datos del usuario, si no hay usuario logeado protege las vistas
    //   if(!user){
    //   console.log(user)
    //   router.push('/')}
    // }, 9000)
    
  },[user])
  
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex  items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-700 shadow">
        <div className="container px-4 mx-auto flex flex-wrap  justify-between">
          <div className="w-full relative flex flex-row justify-between lg:w-auto lg:static ">
            <Link href={!user?"/":"/inside"}
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              >
                Business Admin
              
            </Link>
            <div className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block  outline-none focus:outline-none">
              <DarkMode/>
            </div>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Burger clicked={navbarOpen}/>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-blueGray-700 lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {!user?<>
              <li className="flex items-center">
                <Link href="/auth"
                  className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" ></i>  
                  Login
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/auth/register"
                  className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" ></i> 
                  Register
                </Link>
              </li>
              <li className="flex items-center">
                <a href='https://expo.dev/artifacts/eas/gF5ZhiLncy8Er3CWHWZe6n.apk'
                  className="bg-fuchsia-500 text-white active:bg-fuchsia-700 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150  dark:bg-fuchsia-950"
                  
                >

                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </a>
              </li>
              </>:
              <li className="flex items-center">
              <button onClick={()=>alertConfirmacion('Exit app?',null,logout,null)}
                className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              >
                <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" ></i>  
                Logout
                <Icon path={mdiLogout} size={1} />
              </button>
            </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
