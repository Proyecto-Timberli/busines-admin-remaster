"use client"
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import Header from './Header'
import QRCode  from  "react-qr-code" ;
import { useAuth } from '@/context/authContext'
import CopyToClipboard from '@/components/Reusables/CopyToClipBoard'
import {alertConfirmacion} from '@/components/Reusables/Alerts'
import Footer from '@/components/Footers/FooterAdmin'

export default function Profile() {
  const {user, logout } = useAuth()

  return (
    <>
      <Header 
      />
        <section className="relative block h-40">
        </section>
        <section className="relative  bg-blueGray-200 dark:bg-stone-800">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 dark:bg-stone-950">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative dark:text-white">       
                      <Icon path={mdiAccountCircle} size={8} className="rounded-full h-auto align-middle border-none absolute -m-12 -ml-20 lg:-ml-16 max-w-150-px"/>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="flex bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 items-center"
                        type="button"
                        onClick={()=>alertConfirmacion('Cerrar sesion?',null,logout,null)}
                      >
                        Cerrar Sesion<Icon path={mdiLogout} size={1} className='ml-2  '/>
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-2xl font-semibold leading-normal mb-2 text-blueGray-500  mb-2">
                  {user?.email}
                  </h3>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-500 "></i>
                    Acount - {user?.email}
                  </div>
                  <div className="mb-2 text-blueGray-600 flex w-full justify-center items-center">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-500 "></i>
                    {user?.uid}
                    <CopyToClipboard value= {user?.uid}/>
                  </div>
                  
                  <div className=" leading-normal mt-0 mb-6 flex w-full justify-center ">
                  < QRCode 
                        className='p-2 bg-white'
                        id={'199000000'}
                        size = { 150} 
                        value = {'199000000'} 
                        viewBox = { `0 0 256 256` } 
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        <Footer/>
        </section>
    </>
  );
}
