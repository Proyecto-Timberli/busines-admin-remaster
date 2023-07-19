"use client"
import React, {useEffect, useState } from "react";
import {useAuth} from '@/context/authContext'
import Loading from '@/components/Reusables/Loading'
import CardSale from './CardSale'
import {getSales} from '@/apiFunctions/endPoints'
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import { useRouter,} from "next/navigation";

export default function Sales() {
  const router = useRouter();
  const {userProfile,} = useAuth()
  ////////////////////conexion Api////////////////////////////
  const [salesApi,setSalesApi]=useState([])
  const [dataRender,setDataRender]=useState([])
  useEffect(() => {
    if(userProfile){
      getSales(setSalesApi,userProfile)
    }
  },[userProfile]) 
  useEffect(() => {
    setDataRender([...salesApi])
  },[salesApi])
  /////////////////////////////////////////////////////
  
  return (
    <>
      <Header
        setFilter= {setDataRender} 
        array= {salesApi}
      />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Ventas
                </h6>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col ">
          <div className=" m-2 relative flex flex-col min-w-0 break-words bg-slate-300 rounded   shadow-lg dark:bg-stone-700  py-1 xl:my-2 max-xl:my-2">
            <div className="flex flex-wrap justify-around items-center">
              <div className="flex flex-wrap justify-around items-center w-10/12 h-full">
                <h5 
                  className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
                  Nro de venta
                </h5>
                <span className="font-bold text-xs text-blueGray-700 uppercase dark:text-slate-300 lg:w-1/3">
                  Total
                </span>      
                <span className={" text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4"}>
                  Cliente
                </span>
                <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/6">
                  Fecha/Hora
                </span>  
              </div>
            </div>
          </div>
          <div className="w-full border-solid border-b-2 border-slate-300  dark:border-stone-700  "></div>
          {!salesApi.length?<Loading color='#fff'/>:
            dataRender?.map(item=>
              <button 
                key={item.id+"p"}
                className='m-2 '
                onClick={() => router.push(`/inside/sales/summary?id=${item.id}`)}>    
                <CardSale
                  key={item.id+"p"}
                  id={item.id}
                  total={item.total?item.total:null}
                  date={item.createdDate}
                  resume={item.sellProducts}
                />
                </button> )}
          </div>
        </div>
      <Footer/> 
     </div>
    </>
  );
}
