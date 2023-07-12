import React, { useState } from "react";
import { useAuth } from '@/context/authContext'
import { putProvider } from '@/apiFunctions/endPoints'
import { alertConfirmacion } from '@/components/Reusables/Alerts'

export default function Formprovider({provider}) {
  const { userProfile } = useAuth()
  const [formState, setFormState] = useState({
    id: provider.id,
    identifier: provider.identifier,
    email: provider.email,
    phone: provider.phone,
    location: provider.location,
    about: provider.about,
  })
  const handleChangeInput = (e)=>{
    setFormState({
      ...formState,
      [e.target.name]:e.target.value
    })
  }
  const saveChanges = async () => {
    if(!formState.identifier){
      return {error: 'Completed fields'}
    }
    const response = await putProvider(userProfile, provider.id , formState)
    return response
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 dark:bg-stone-950">
        <div className="rounded-t bg-white mb-0 px-6 py-6 dark:bg-stone-950">
          <div className="text-center flex justify-between ">
            <h6 className="text-blueGray-500 text-sm font-bold ">provider id: {formState.id}</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>alertConfirmacion("Save changes?", null, saveChanges, null)}
            >
              Save changes
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0" >
          <form className="dark:bg-stone-950">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Provider Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.identifier}
                    name="identifier"
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
                    Email address
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.email}
                    name="email"
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
                    Phone
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.phone}
                    name="phone"
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
                    Location
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.location}
                    name="location"
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
                    About provider
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    rows="4"
                    value={formState.about}
                    name="about"
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
