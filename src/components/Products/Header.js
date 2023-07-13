import React from "react";
import SearchFilter from '@/components/Reusables/SearchBars'
import CardButton from "./CardButton";
import LabelFilter from "./LabelFilter";

export default function  Header({
  setFilter, 
  array,
  labels,
  onPress,
  onPressLabels,
}) {

  return (
    <>
      <div className="relative bg-fuchsia-500 dark:bg-fuchsia-950 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex flex-wrap justify-center items-center">
              <CardButton
                statSubtitle="Agregar Producto"
                statTitle="Agregar"
                statIconName="print"
                statIconColor="bg-orange-500"
                onPress={onPress}
              />
               <CardButton
                statSubtitle="Nueva etiqueta"
                statTitle="Etiquetas"
                statIconName=""
                statIconColor="bg-green-500"
                onPress={onPressLabels}
              />
                <LabelFilter 
                setFilter= {setFilter}
                array= {array}
                labels ={labels}
              />
              </div>
              <div className="w-full flex flex-wrap justify-center items-center mt-4">
              <SearchFilter 
                setFilter= {setFilter} 
                array= {array}
                atribute= {'id'}
                placeholder= {'Buscar Producto...'}
                />  
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
