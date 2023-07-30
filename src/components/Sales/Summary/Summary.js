"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from '@/context/authContext'
import Loading from '@/components/Reusables/Loading'
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import QRCode  from  "react-qr-code" ;
import SummaryPdf from './SummaryPdf';
import { PDFViewer } from '@react-pdf/renderer';
import {getBusiness, cancelSale, getSale } from '@/apiFunctions/endPoints'
import { formatDate, financial } from '@/apiFunctions/apiFunctions';
import {alertConfirmacion} from '@/components/Reusables/Alerts'
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';





export default function Summary(){
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')
  const [sale,setSale] = useState(null)
  const {userProfile, userPermissions} = useAuth()
  const [businessApi,setBusinessApi] = useState(null)
  const [pdfVisible,setPdfVisible] = useState(false)

  const canceled = async (userProfile, data, id, navigation)=>{
    const response = await cancelSale(userProfile , data, id)
    navigation()
    return response
  }

  useEffect(()=>{
    getSale(userProfile,id,setSale)
    getBusiness(userProfile,setBusinessApi)
  },[userProfile])
  
  useEffect(()=>{ 
    console.log(sale)
  },[sale])
  return (
    <>
      {pdfVisible&&businessApi? 
      <div className="px-4 md:px-10 mx-auto w-full m-16">
        <Icon onClick={()=>{setPdfVisible(false)}}path={mdiArrowLeft} size={2} color='rgb(52, 51, 72)'/>
        <PDFViewer style={{width:'100%' ,height:'90vh'}}><SummaryPdf sale={{...sale,id:id}} businessDate={businessApi}/></PDFViewer>
      </div>:
      <>
      <Header setPdfVisible={()=>setPdfVisible(true)} canceled={()=>alertConfirmacion('Cancel sale?',null,()=>canceled(userProfile, sale?.sellProducts, id,()=>router.push('/inside/sales')),null)}
      />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 w-full bg-transparent">
            <div className="flex w-full flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Resumen
                </h6>
                <div className='flex flex-col w-full'>
                  <div className='flex flex-wrap w-full mb-2'>
                    <div className="relative flex flex-col max-sm:w-full sm:w-1/2 min-w-0 break-words bg-slate-300 rounded   dark:bg-stone-700 pt-2 pb-2 items-center justify-center">
                      <div className="flex flex-col justify-around items-left p-3">
                        <p className='text-base text-blueGray-700 dark:text-slate-300'>Nro de venta: {id}</p>
                        <p className='text-base text-blueGray-700 dark:text-slate-300'>Fecha: {sale?.createdDate?formatDate(sale.createdDate).formatDate+" / "+formatDate(sale.createdDate).hora:null} </p>
                        <p className='text-base text-blueGray-700 dark:text-slate-300'>Cliente: {sale?.client?sale.client:"ninguno"}</p>
                        <p className='text-base text-blueGray-700 dark:text-slate-300'>Nro de Cliente: {sale?.idClient?sale.idClient:"ninguno"}</p>
                        <p className='text-base text-blueGray-700 dark:text-slate-300'>Forma de Pago: {sale?.wayToPay?sale.wayToPay:"ninguna"} </p>
                      </div>
                    </div>
                    <div className='max-sm:w-full sm:w-1/2 flex flex-wrap justify-center items-center rounded bg-slate-300 dark:bg-stone-700 p-3'>
                      < QRCode 
                        id={id+'D'}
                        size = { 150} 
                        value = {id} 
                        viewBox = { `0 0 256 256` } 
                      />
                    </div>  
                    
                    
                  </div >  
                  {sale?.sellProducts?    
                  <div className='flex flex-col w-full h-auto'>
                      {sale?.sellProducts.map(item => 
                      <div className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded shadow-lg dark:bg-stone-700 mb-2 mt-2 p-3">
                        <div className="flex flex-wrap justify-around items-center">
                          <p className='text-base text-blueGray-700 dark:text-slate-300'>{item.name}</p>
                          <p className='text-base text-blueGray-700 dark:text-slate-300'>Precio por unidad: {item.priceSelect?financial(item.priceSelect):null}</p>
                          <p className='text-base text-blueGray-700 dark:text-slate-300'>Cantidad: {item.amount}</p>
                          <p className='text-base text-blueGray-700 dark:text-slate-300'>Total Producto: {item.priceSelect?financial(item.priceSelect*item.amount):null}</p>
                        </div>
                      </div>)}
                      <div className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded shadow-lg p-3 dark:bg-stone-700 mt-2">
                        <div className="flex flex-wrap justify-around items-center">
                         <p className='text-base text-blueGray-700 dark:text-slate-300'>Total: {sale?.total}</p>
                        </div>
                      </div>
                  </div> : <div className='bg-slate-300 rounded shadow-lg dark:bg-stone-700 w-full py-6'><Loading/></div>}
                </div>  
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
     </>}
    </>
  );
}
