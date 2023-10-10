"use client"
import React, { useState, useEffect} from "react";
import { useAuth } from '@/context/authContext'
import { alertConfirmacion } from '@/components/Reusables/Alerts'
import Icon from '@mdi/react';
import { mdiCheckboxMarked } from '@mdi/js';
import { mdiCloseBox } from '@mdi/js';
import { putAccessProfile, deleteAccessProfile} from '@/apiFunctions/endPoints'

export default function FormLabelEdit({
  profile,
  refreshProfiles,
}) {
  const { userProfile } = useAuth()
  const [permissions, setPermissions] = useState({
    name:profile.name?profile.name:"",
    modifyProducts:profile.modifyProducts?profile.modifyProducts:false,
    modifyClients:profile.modifyClients?profile.modifyClients:false,
    modifyProviders:profile.modifyProviders?profile.modifyProviders:false,
    modifySales:profile.modifySales?profile.modifySales:false,
    modifyBuys:profile.modifyBuys?profile.modifyBuys:false,
    accessToStatistics:profile.accessToStatistics?profile.accessToStatistics:false,
    accessToBuys:profile.accessToBuys?profile.accessToBuys:false,
    accesToProviders:profile.accessToProviders?profile.accessToProviders:false,
    uidEntry:profile.uidEntry?profile.uidEntry:userProfile,
    from:profile.from?profile.from:"",
    usersLinked:profile.usersLinked?profile.usersLinked:[],
  })
  useEffect(()=>{
    setPermissions({
      name:profile.name?profile.name:"",
      modifyProducts:profile.modifyProducts?profile.modifyProducts:false,
      modifyClients:profile.modifyClients?profile.modifyClients:false,
      modifyProviders:profile.modifyProviders?profile.modifyProviders:false,
      modifySales:profile.modifySales?profile.modifySales:false,
      modifyBuys:profile.modifyBuys?profile.modifyBuys:false,
      accessToStatistics:profile.accessToStatistics?profile.accessToStatistics:false,
      accessToBuys:profile.accessToBuys?profile.accessToBuys:false,
      accesToProviders:profile.accessToProviders?profile.accessToProviders:false,
      uidEntry:profile.uidEntry?profile.uidEntry:userProfile,
      from:profile.from?profile.from:"",
      usersLinked:profile.usersLinked?profile.usersLinked:[],
    }
    )
  },[profile])
  const checkOk=(key)=>{
    setPermissions({
      ...permissions,
      [key]:true
    })
  }
  const checkNull=(key)=>{
    setPermissions({
      ...permissions,
      [key]:false
    })
  }
  const handleChangeInput =(e)=>{
    setPermissions({
      ...permissions,
      name:e.target.value
    })
  }

  const updateLabel = async () => {
    let response = {error: 'No puede ser modificado tiene usuarios vinculados'}
    if (!permissions.usersLinked.length){
      response = await putAccessProfile(userProfile, profile.id, permissions)
      await refreshProfiles()
      return response
    }
    else if(!permissions.name){return {error:'Completa los campos'}}
    else {
      return response
    }
  }

  const deleteLabel = async () => {
    let response = {error: 'no puede eliminarse tiene usuarios vinculados'}
    if (!permissions.usersLinked.length){
      response = await deleteAccessProfile(userProfile, profile.id)
      await refreshProfiles()
      return response
    }else{
      return response
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words lg:w-1/2 max-lg:w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 dark:bg-stone-950">
        <div className="rounded-t  mb-0 px-6 py-6 dark:bg-stone-950">
          <div className="text-center flex justify-between ">
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>alertConfirmacion("Eliminar perfil?", null, deleteLabel, null)}
            >
              Eliminar perfil de acceso {profile.name}
            </button>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>alertConfirmacion("Modificar perfil?", null, updateLabel, null)}
            >
              Guardar cambios 
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0" >
          <form className="dark:bg-stone-950">
            <div className="flex flex-wrap">
            <div className="w-full  px-4">
                <div className="relative w-full mb-3 flex flex-col  justify-around items-center">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300 text-center "
                    value={permissions.name}
                    name="name"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full  px-4 pt-4">
                <div className="relative w-full mb-3 flex flex-row  justify-around items-center">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Permisos
                  </label>
                </div>
              </div>
              <div className="w-full  px-4">
                <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
                <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Modificar productos
                </label>
                {permissions.modifyProducts?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyProducts")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyProducts")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyProducts")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyProducts")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
              </div>
              <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
            <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                > 
                  Modificar clientes
                </label>
                {permissions.modifyClients?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyClients")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyClients")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyClients")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyClients")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
             </div>
             <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
            <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Modificar provedores
                </label>
                {permissions.modifyProviders?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyProviders")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyProviders")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
            </div>
            <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
            <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Modificar ventas
                </label>
                {permissions.modifySales?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifySales")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifySales")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifySales")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifySales")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
            </div>
            <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
            <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Modificar compras
                </label>
                {permissions.modifyBuys?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyBuys")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("modifyBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("modifyBuys")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
            </div>
            <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
            <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Acceso a las estadisticas
                </label>
                {permissions.accessToStatistics?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("accessToStatistics")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("accessToStatistics")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("accessToStatistics")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("accessToStatistics")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
            </div>
            <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
            <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Acceso a las compras
                </label>
                {permissions.accessToBuys?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("accessToBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("accessToBuys")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("accessToBuys")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("accessToBuys")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
            </div>
            <div className="relative w-full mb-3 flex flex-row  justify-between items-center">
            <label
                  className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Acceso a los provedores
                </label>
                {permissions.accesToProviders?
                <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("accesToProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="green"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("accesToProviders")}><Icon path={mdiCloseBox} size={1.5} color="gray" /></div> 
                </div>:
                 <div className='flex'>
                    <div className='border-none bg-transparent' onClick={()=>checkOk("accesToProviders")}><Icon path={mdiCheckboxMarked} size={1.5} color="gray"/></div> 
                    <div className='border-none bg-transparent' onClick={()=>checkNull("accesToProviders")}><Icon path={mdiCloseBox} size={1.5} color="red" /></div> 
                </div>
                }
            </div>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
