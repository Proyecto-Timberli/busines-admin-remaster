"use client"
import React from "react";
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import FormProduct from "./FormProduct";


export default function Add(){

  return (
    <>
      <Header/>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 w-full bg-transparent">
            <div className="flex w-full flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Create new client
                </h6>  
                <FormProduct/>     
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col ">
            <div className="relative h-350-px">
            </div>
          </div>
        </div>
      <Footer/> 
     </div>
    </>
  );
}
