
"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext'
import Loading from '@/components/Reusables/Loading'
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import { getBusiness,  } from '@/apiFunctions/endPoints'
import FormBusiness from "./FormBusiness";

export default function Detail(){
  const [business, setBusiness] = useState(null)
  const { userProfile, userPermissions } = useAuth()

  useEffect(()=>{
    getBusiness(userProfile,setBusiness)
  },[userProfile])
  
  return (
    <>
      <Header />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 w-full bg-transparent">
            <div className="flex w-full flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Mi Negocio
                </h6>  
                {business?<FormBusiness business={business} refresh ={()=>getBusiness(userProfile,setBusiness)}/>
                :<div className='bg-slate-300 rounded shadow-lg dark:bg-stone-700 w-full py-6'><Loading/></div> }           
                  
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col ">
          </div>
        </div>
      <Footer/> 
     </div>
    </>
  );
}
