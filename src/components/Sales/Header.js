import React from "react";
import SearchFilter from '@/components/Reusables/SearchBars'

export default function  HeaderStats({
  setFilter, 
  array}) {
  return (
    <>
      <div className="relative bg-fuchsia-500 dark:bg-fuchsia-950 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap justify-center">
              <SearchFilter 
                setFilter= {setFilter} 
                array= {array}
                atribute= {'id'}
                placeholder= {'Buscar Venta'}
              />  
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
