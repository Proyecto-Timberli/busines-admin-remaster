import React from "react";
import SearchFilter from '@/components/Reusables/SearchBars'
import CardButton from "./CardButton";
import Orders from "../Customers/Orders";

export default function  HeaderStats({
  setFilter, 
  dataRender,
  array,
  onPress
}) {
  return (
    <>
      <div className="relative bg-fuchsia-500 dark:bg-fuchsia-950 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap justify-center">
              <CardButton
                statSubtitle="Agregar provedor"
                statTitle="Agregar"
                statIconName="print"
                statIconColor="bg-orange-500"
                onPress={onPress}
              />
              <SearchFilter 
                setFilter= {setFilter} 
                array= {array}
                atribute= {'id'}
                atributes={['id', 'identifier','location']}
                placeholder= {'Buscar provedor...'}
              />  
            </div>
            <div className="w-full flex flex-wrap justify-center items-center mt-4">  
               <Orders setFilter= {setFilter} 
                  array= {dataRender}/>   
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
