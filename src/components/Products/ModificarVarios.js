"use client"
import React, { useState } from "react";
import {useAuth} from '@/context/authContext'
import {putProducts } from '@/apiFunctions/endPoints'
import {alertConfirmacion} from '@/components/Reusables/Alerts'

export default function ModificarVarios({
    arraySelection,
    setArraySelection,
    setProductsApi,
}){
    const {userProfile} = useAuth()
    const [aumentar,setAumentar]=useState(true)// aumentar o bajar precios
    const [valor,setValor]=useState(0)//porcentaje

    const handleChangeInput=(e)=>{
        setValor(e.target.value)
    }

    function aplicar(){       
        if(aumentar){
            return (arraySelection.map(e=>e={...e,price:Math.floor(e.price)+(e.price*(valor/100))}))          
        }
        if(!aumentar){ 
            return(arraySelection.map(e=>e={...e,price:Math.floor(e.price)-(e.price*(valor/100))}))
        }   
    }
    async function guardar (){
        if(!valor){return {error: "Incomplete fields"}}
        const response = await putProducts(userProfile,aplicar())
        setValor(0)
        setArraySelection([])
        setProductsApi()  
        return response
    }
  
    return(
        <>                                      
            <div className="flex flex-wrap items-center ml-12 justify-center">                          
                    <button 
                        onClick={()=>setAumentar(true)}  
                        type="button"
                        className={
                            !aumentar?"bg-slate-300 dark:bg-stone-700 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex flex-wrap items-center mb-1 mt-1"
                            :"bg-green-700 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex flex-wrap items-center mb-1 mt-1"
                        }
                    >                              
                        <p className={
                            !aumentar?"text-blueGray-700 dark:text-slate-300":"text-slate-200"}>Aumentar precios</p>                               
                    </button>                                 
                    <button 
                        onClick={()=>setAumentar(false)} 
                        className={
                            !!aumentar?"bg-slate-300 dark:bg-stone-700 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex flex-wrap items-center mb-1 mt-1"
                            :"bg-red-700 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex flex-wrap items-center mb-1 mt-1"
                        }
                    >
                         <p className={
                            !!aumentar?"text-blueGray-700 dark:text-slate-300":"text-slate-200"}>Bajar precios</p>                                
                    </button>    
                    <div className='flex flex-row ml-3'>
                        <input
                            type="text"
                            className='className="border-0 px-2  placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-20 pl-4' 
                            onChange={(e) =>handleChangeInput(e)}
                            value={valor}
                            placeholder="0"
                        />
                        <button                           
                            className="bg-slate-300 dark:bg-stone-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex flex-wrap items-center">
                            <p className="text-blueGray-700 dark:text-slate-300 text-sm">%</p>                            
                        </button>
                    </div>  
                    <button 
                        onClick={()=>alertConfirmacion("Actualizar Precios?",null,guardar,null)}
                        className="bg-fuchsia-600 text-white active:bg-fuchsia-700 text-xs font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1  ml-3  ease-linear transition-all duration-150  dark:bg-fuchsia-950">     
                            <p className="text-slate-200">Modify products</p>                               
                    </button>                               
            </div>
        </>
    )
}
                  
