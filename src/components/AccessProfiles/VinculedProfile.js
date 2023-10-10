"use client"
import React from "react";
import { deleteLinkAccesProfile } from '@/apiFunctions/endPoints'
import { useAuth } from '@/context/authContext'
import {alertConfirmacion} from '../Reusables/Alerts'
import Loading from "@/components/Reusables/Loading";

function CardProfile({
  identifier, 
  onPress,
  selectOn,
}){
  return (
    <>
        <div key={identifier} 
            className={selectOn===identifier? "relative flex flex-col min-w-0 break-words bg-slate-500 rounded  xl:mb-0 shadow-lg dark:bg-stone-950  py-3 px-2 xl:my-4 max-xl:my-2"
            :"relative flex flex-col min-w-0 break-words bg-slate-300 rounded  xl:mb-0 shadow-lg dark:bg-stone-700  py-3 px-2 xl:my-4 max-xl:my-2"}
        >
        <div className="flex flex-wrap justify-around items-center">
          <div
            className="flex flex-wrap justify-around items-center w-10/12 h-full"
            >  
          <span className="font-semibold text-x text-blueGray-700 dark:text-slate-300">
            {identifier}
          </span>       
          <button
            onClick={() => onPress()}
            >
            <h6 className="uppercase text-red-700 mb-1 text-xs font-semibold dark:text-slate-300">
              Desvincular</h6>
          </button>     
         </div> 
        </div>
        </div>
    </>
  );
}



export default function VinculedProfile({vinculedProfile, profil, refresh}){
  const {userProfile} = useAuth()
  const deleteAction = async (item)=>{
    const response = await deleteLinkAccesProfile(userProfile, {...profil, usersLinked:profil.usersLinked.filter(p =>  p.identifier != item.identifier )}, item.userCode);
    setTimeout(()=> refresh(),1000)
    return response
  }
  return (
    <>   
      <div className="h-96 block  overflow-y-auto  items-center justify-between relative w-full py-3 px-2 mr-4 mb-4">
        <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
          Usuarios vinculados al perfil {profil.name}
        </h6>   
        
        {!vinculedProfile ? <Loading color={'#fff'}/>:!vinculedProfile.length ? null :
          vinculedProfile?.map(item=>  
        <CardProfile
          key={item.identifier}
          identifier={item.identifier} 
          onPress={()=>alertConfirmacion('Desvincular usuario?', null, ()=>deleteAction(item))}
        />)}
      </div>
    </>
  );
}
