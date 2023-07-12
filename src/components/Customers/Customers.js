"use client"
import React, {useEffect, useState } from "react";
import {useAuth} from '@/context/authContext'
import Loading from '@/components/Reusables/Loading'
import CardClient from './CardClient'
import {getCustomers} from '@/apiFunctions/endPoints'
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import { useRouter,} from "next/navigation";

export default function Sales() {
  const router = useRouter();
  const {userProfile,} = useAuth()
  ////////////////////conexion Api////////////////////////////
  const [customersApi,setCustomersApi]=useState([])
  const [dataRender,setDataRender]=useState([])
  useEffect(() => {
    if(userProfile){
      getCustomers(userProfile, setCustomersApi)
    }
  },[userProfile]) 
  useEffect(() => {
    setDataRender([...customersApi])
    console.log(customersApi)
  },[customersApi])
  /////////////////////////////////////////////////////
  
  return (
    <>
      <Header
        setFilter = {setDataRender} 
        array = {customersApi}
        onPress = {()=>router.push('inside/customers/add')}
      />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Customers
                </h6>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col ">
          {!customersApi.length?<Loading color={'#fff'}/>:
            dataRender?.map(item=>
              <button 
                key={item.id+"p"}
                className='m-2 '
                onClick={() => router.push(`/inside/customers/detail?id=${item.id}`)}>    
                 <CardClient
                    key={item.id}
                    id={item.id}
                    name={item.identifier}
                    phone={item.phone}
                    location={item.location}
                  />
              </button> )}
          </div>
        </div>
      <Footer/> 
     </div>
    </>
  );
}