"use client"
import React, { useEffect, useState } from "react";
import Header from './Header'
import Footer from '@/components/Footers/FooterAdmin'
import FormLabel from "./FormLabel";
import FormLabelEdit from "./FormLabelEdit";
import { getCategories} from '@/apiFunctions/endPoints'
import { useAuth } from '@/context/authContext'
import Loading from "@/components/Reusables/Loading";
import CardLabel from './CardLabel'
import CardNewLabel from './CardNewLabel'


    
export default function Labels(){
  const {userProfile} = useAuth()
  const [categoriesApi, setCategoriesApi]= useState([])
  const [labelSelect, setLabelSelect]= useState(null)
  useEffect(() => {
    if(userProfile){
      getCategories(userProfile, setCategoriesApi)
    }
  },[userProfile]) 
  useEffect(() => {
    setLabelSelect(null)
  },[categoriesApi]) 
  return (
    <>
      <Header/>
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700 py-4">
          <div className="rounded-t px-4 py-3 w-full bg-transparent">
            <div className="flex w-full flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Etiquetas
                </h6>   
                <div className="w-full flex max-lg:flex-col lg:flex-row justify-center items-center ">              
                  <div className="h-96 block  md:overflow-y-auto  items-center justify-between relative lg:w-1/2 max-lg:w-full py-3 px-2 mr-4">
                    <CardNewLabel
                      selectOn={labelSelect}
                      onPress={setLabelSelect}
                    />
                    {!categoriesApi.length?<Loading color={'#fff'}/>:
                      categoriesApi?.map(item=>  
                      <CardLabel
                        id={item.id}
                        name={item.name}
                        description={item.description?item.description:""}
                        onPress={setLabelSelect}
                        selectOn={labelSelect?.id}
                      />)}
                  </div>
                {!labelSelect?<FormLabel refreshLabels={()=>getCategories(userProfile, setCategoriesApi)}/>:
                <FormLabelEdit 
                  id = {labelSelect.id}
                  name = {labelSelect.name}
                  description = {labelSelect.description}
                  refreshLabels = {()=>getCategories(userProfile, setCategoriesApi)}
                /> }
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
