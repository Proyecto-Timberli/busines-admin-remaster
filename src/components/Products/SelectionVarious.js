"use client"
import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiCheckboxBlankOutline } from '@mdi/js';
import { mdiCheckboxMarkedOutline } from '@mdi/js';

export default function SelectionVarious({dataRender, setArraySelection}) {

    const [all,setAll] = useState(false);

    function selectAll(){
        if (!all){
            setAll(true)
            setArraySelection(dataRender)
        }else{setAll(false)
            setArraySelection([])}
    }
   
    return(
        <>
            <button 
                className="bg-slate-300 dark:bg-stone-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex flex-wrap items-center"
                type="button"
                onClick={()=>selectAll()}> 
                <p className="text-blueGray-700 dark:text-slate-300" >Select All</p>
                {!all&&<Icon className="ml-2" path={mdiCheckboxBlankOutline} size={1} color={'black'}/>}
                {!!all&&<Icon className="ml-2" path={mdiCheckboxMarkedOutline} size={1} color={'black'}/>}
            </button>
            {/* <ModificarVarios estado={seleccionarVarios} listaSeleccionados={arraySeleccionados} setListaSeleccionados={setArraySeleccionados} listaCompleta={arrayAMostrar} recargarLista={getProducts} visible={visibleModificarVarios} setVisible={setVisibleModificarVarios} />  */}
        </>
    )
}