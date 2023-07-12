
"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from '@/context/authContext'
import Loading from '@/components/Reusables/Loading'
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import { getProduct, deleteProduct} from '@/apiFunctions/endPoints'
import {alertConfirmacion} from '@/components/Reusables/Alerts'
import FormProduct from "./FormProduct";

const deleted = async (userProfile, id, navigation) => {
  const response = await deleteProduct(userProfile, id)
  navigation()
  return response
}

export default function Detail(){
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')
  const [product, setProduct] = useState(null)
  const { userProfile, userPermissions } = useAuth()

  useEffect(()=>{
    getProduct(userProfile,id,setProduct)
  },[userProfile])
  
  return (
    <>
      <Header deleted={()=>alertConfirmacion('Delete product?',null,()=>deleted(userProfile, id, ()=>router.push('/inside/products')),null) }/>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 w-full bg-transparent">
            <div className="flex w-full flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Product
                </h6>  
                {product?<FormProduct product={product}/>
                :<div className='bg-slate-300 rounded shadow-lg dark:bg-stone-700 w-full py-6'><Loading/></div> }           
                  
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
