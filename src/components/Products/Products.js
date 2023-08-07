import React, { useEffect, useState } from "react";
import CardProduct from './CardProduct'
import { financial } from '@/apiFunctions/apiFunctions';
import { useRouter } from "next/navigation";
import Icon from '@mdi/react';
import { mdiCheckboxBlankOutline } from '@mdi/js';
import { mdiCheckboxMarkedOutline } from '@mdi/js';
import SelectionVarious from './SelectionVarious'
import ModificarVarios from "./ModificarVarios";
import Loading from "../Reusables/Loading";

export default function Products({ productsApi, dataRender, setProductsApi, loadingOn=false }) {    
  const router = useRouter();
  const [arraySelection, setArraySelection]= useState([]);
  const onLongPressHandler=(params)=>{

    if(arraySelection.includes(params)){
        setArraySelection(arraySelection.filter(select=>select!==params))
    }
    else{
        setArraySelection([...arraySelection,params])
    }
  }
  
  return(
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              Productos
            </h6>
            <div className="flex flex-wrap items-center">
            <SelectionVarious 
              dataRender={dataRender} 
              setArraySelection={setArraySelection}
            />
            {!!arraySelection.length&&<ModificarVarios 
              arraySelection={arraySelection}
              setArraySelection={setArraySelection}
              setProductsApi={setProductsApi}
            />}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col ">
        <div className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded   shadow-lg dark:bg-stone-700  py-1 xl:my-2 max-xl:my-2">
        <div className="flex flex-wrap justify-around items-center">
        <div className="flex flex-wrap justify-around items-center w-10/12 h-full">
          <h5 
            className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            Codigo de barra 
          </h5>
          <span className="font-bold text-xs text-blueGray-700 uppercase dark:text-slate-300 lg:w-1/3">
            Nombre
          </span>      
          <span className={" text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4"}>
            Etiqueta
          </span>
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/6">
            Precio
          </span>  
        </div>
        </div>
        </div>
        <div className="w-full border-solid border-b-2 border-slate-300  dark:border-stone-700  "></div>

        {loadingOn?<Loading color={'#fff'}/>:
          dataRender?.map(item=>
            <div key={item.id} className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded  xl:mb-0 shadow-lg dark:bg-stone-700  py-3 xl:my-4 max-xl:my-2">
              <div className="flex flex-wrap justify-around items-center">
                <button 
                    className="flex flex-wrap justify-around items-center w-10/12 h-full"
                    onClick={() => router.push(`/inside/products/detail?id=${item.id}`)}>    
                    <CardProduct
                        id={item.id}
                        barCode={item.barCode}
                        name={item.name}
                        category={item.category}
                        price={item.price?financial(item.price):null}
                        arraySelection={ arraySelection }
                    />
                </button> 
                <button onClick={()=>onLongPressHandler(item)}> 
                  {arraySelection?.includes(item)?
                  <Icon path={mdiCheckboxMarkedOutline} size={1} />:
                  <Icon path={mdiCheckboxBlankOutline} size={1} />}
                </button>
              </div>
            </div>)}
      </div>
    </div>
    )
}