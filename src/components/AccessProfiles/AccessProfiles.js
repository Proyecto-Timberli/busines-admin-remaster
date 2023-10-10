"use client"
import React, { useEffect, useState } from "react";
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import FormProfile from "./FormLabel";
import FormProfileEdit from "./FormLabelEdit";
import { getAccessProfiles, postLinkAccesProfile } from '@/apiFunctions/endPoints'
import { useAuth } from '@/context/authContext'
import Loading from "@/components/Reusables/Loading";
import CardProfile from './CardLabel'
import CardNewProfile from './CardNewLabel'
import CardButton from './CardButton'
import {alertForm} from '../Reusables/Alerts'
import VinculedProfile from '../AccessProfiles/VinculedProfile'

export default function AccessProfiles(){
  const {userProfile} = useAuth()
  const [accessProfilesApi, setAccessProfilesApi]= useState([])
  const [labelSelect, setLabelSelect]= useState(null)
  useEffect(() => {
    if(userProfile){
      getAccessProfiles(userProfile, setAccessProfilesApi)
    }
  },[userProfile]) 
  useEffect(() => {
    setLabelSelect(null)
    console.log(accessProfilesApi)
  },[accessProfilesApi]) 
 

  const linkProfile = async (value)=>{
    const responce = await postLinkAccesProfile(userProfile, labelSelect, value)
    console.log(responce)
    setTimeout(()=> getAccessProfiles(userProfile, setAccessProfilesApi),1000)
    return responce
  }
  return (
    <>
      <Header/>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700 py-4">
          <div className="rounded-t px-4 py-3 w-full bg-transparent">
            <div className="flex w-full flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Perfiles de acceso
                </h6>   
                <div className="w-full flex max-lg:flex-row lg:flex-row justify-center ">  
                <div className="flex flex-col lg:w-1/2 max-lg:w-1/3 py-3 px-2 mr-4">         
                  <div className="h-96 block  overflow-y-auto  items-center justify-between relative w-full py-3 px-2 mr-4 mb-4">
                    <CardNewProfile
                      selectOn={labelSelect}
                      onPress={setLabelSelect}
                    />
                    {!accessProfilesApi.length?<Loading color={'#fff'}/>:
                      accessProfilesApi?.map(item=>  
                        <CardProfile
                        key={item.id}
                        id={item.id} 
                        name={item.name} 
                        onPress={()=>setLabelSelect(item)}
                        selectOn={labelSelect?.id}
                      />)}
                  </div>
                  {labelSelect?
                  <>
                  <CardButton
                    statSubtitle="Vincular perfil"
                    statTitle="Vincular"
                    statIconName="print"
                    statIconColor="bg-orange-500"
                    onPress={()=>alertForm('Vincular perfil',null,linkProfile,'Codigo de usuario...')}
                  />
                  <VinculedProfile
                    vinculedProfile={labelSelect.usersLinked}
                    profil={labelSelect}
                    refresh={()=>getAccessProfiles(userProfile, setAccessProfilesApi)}
                  />
                  </>:null}
                </div>   
                {!labelSelect?<FormProfile refreshProfiles={()=>getAccessProfiles(userProfile, setAccessProfilesApi)}/>:
                <FormProfileEdit 
                  profile={labelSelect}
                  refreshProfiles = {()=>getAccessProfiles(userProfile, setAccessProfilesApi)}
                />}
                </div>     
              </div>
            </div>
          </div>
        </div>
      <Footer/> 
     </div>
    </>
  );
}
