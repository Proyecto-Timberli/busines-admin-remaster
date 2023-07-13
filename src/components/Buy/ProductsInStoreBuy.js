import React,{useState} from "react";
import CardProduct from './CardProduct'
import { financial } from '@/apiFunctions/apiFunctions';
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import Loading from "../Reusables/Loading";
import SearchFilter from '@/components/Reusables/SearchBars'


export default function Products({ productInStore, pressCart, setStoreVisible}) {    
  const [dataRender,setDataRender] = useState(productInStore?productInStore:[])

  return(
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 w-full h-screen bg-gray-800/50  flex items-center justify-center content-center">
    <div className="w-10/12 flex flex-col break-words h-auto pb-4 mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center justify-between">
          <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              Agregar producto al carro
          </h6>
          <button
              className="bg-stone-950 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={setStoreVisible}
            >
              Cancelar
            </button>
          <div className=" w-full max-w-full flex flex-row justify-center items-center">
            <SearchFilter 
              setFilter= {setDataRender} 
              array= {productInStore}
              atribute= {'name'}
              placeholder= {'Search product...'}
            />  
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col overflow-y-auto h-96">
        {!productInStore.length?<Loading color={'#fff'}/>:
          dataRender?.map(item=>
            <div key={item.id} className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded shadow-lg dark:bg-stone-700  py-3 xl:my-2 max-xl:my-2"
                onClick={()=>pressCart(item)}
            >
              <div className="flex flex-wrap justify-around items-center">
                <div className="flex flex-wrap justify-around items-center w-10/12 h-full">    
                    <CardProduct
                        id={item.id}
                        name={item.name}
                        category={item.category}
                        price={item.price?financial(item.price):null}
                    />
                </div> 
                <button onClick={()=>pressCart(item)}> 
                  <Icon path={mdiCartPlus} size={1} />
                </button>
              </div>
            </div>)}
      </div>
    </div>
    </div>
    )
}