"use client"
import React, { useState, useEffect } from "react";
import { useAuth } from '@/context/authContext'
import { putCategory, deleteCategory } from '@/apiFunctions/endPoints'
import { alertConfirmacion } from '@/components/Reusables/Alerts'

export default function FormLabelEdit({
  id,
  name,
  description,
  refreshLabels
}) {
  const { userProfile } = useAuth()
  const [formState, setFormState] = useState({
    id:id,
    name:name,
    description:description,
  })
  useEffect(()=>{
    setFormState({
      id:id,
      name:name,
      description:description,
    })
  },[id])
  const handleChangeInput = (e)=>{
    setFormState({
      ...formState,
      [e.target.name]:e.target.value
    })
  }
  const updateLabel = async () => {
    if(!formState.name){return {error:'Complete fields'}}
    const response = await putCategory(userProfile,id , formState)
    await refreshLabels()
    setFormState({
      name:"",
      description:""
    })
    return response
  }

  const deleteLabel = async () => {
    const response = await deleteCategory(userProfile,id , formState)
    await refreshLabels()
    return response
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words lg:w-1/2 max-lg:w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 dark:bg-stone-950">
        <div className="rounded-t bg-white mb-0 px-6 py-6 dark:bg-stone-950">
          <div className="text-center flex justify-between ">
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>alertConfirmacion("Delete label?", null, deleteLabel, null)}
            >
                Eliminar etiqueta {name}
            </button>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>alertConfirmacion("Update label?", null, updateLabel, null)}
            >
              Guardar cambios {name}
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0" >
          <form className="dark:bg-stone-950">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informacion de la etiqueta
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
                    value={formState.name}
                    name="name"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Acerca de la etiqueta
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    rows="4"
                    value={formState.description}
                    name="description"
                    onChange={(e)=>handleChangeInput(e)}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
