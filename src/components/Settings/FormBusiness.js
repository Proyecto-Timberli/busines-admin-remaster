import React, { useState } from "react";
import { useAuth } from '@/context/authContext'
import { postBusiness } from '@/apiFunctions/endPoints'
import { alertConfirmacion } from '@/components/Reusables/Alerts'

export default function FormBusiness({business, refresh}) {
  const { userProfile } = useAuth()
  const { telefono, ubicacion, de, cuit, negocio ,cbu } = business?.myBusiness
  const [formState, setFormState] = useState({
    negocio: negocio? negocio :"",
    de: de? de :"",
    cuit : cuit? cuit :"",
    telefono: telefono? telefono :"",
    ubicacion: ubicacion? ubicacion :"",
    cbu: cbu? cbu :"",
  })
  const handleChangeInput = (e)=>{
    setFormState({
      ...formState,
      [e.target.name]:e.target.value
    })
  }
  const saveChanges = async() => {
    if(!formState.negocio){return {error:'Complete fields'}}
    const response = await postBusiness(userProfile, {...business, myBusiness:{...formState}})
    await refresh()
    return response
  } 

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 dark:bg-stone-950">
        <div className="rounded-t bg-white mb-0 px-6 py-6 dark:bg-stone-950">
          <div className="text-center flex justify-between ">
            <h6 className="text-blueGray-500 text-sm font-bold ">Business: {negocio}</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>alertConfirmacion("Save changes?", null, saveChanges, null)}
            >
              Guardar cambios
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0" >
          <form className="dark:bg-stone-950">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Business information
            </h6>
            <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.negocio}
                    name="negocio"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Propietario
                  </label>
                  <input
                    
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.de}
                    name="de"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cuit
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.cuit}
                    name="cuit"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Telefono
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.telefono}
                    name="telefono"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ubicacion
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.ubicacion}
                    name="ubicacion"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cbu
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.cbu}
                    name="cbu"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
