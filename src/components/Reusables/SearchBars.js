"use client"
import React, { useState, useEffect} from "react";

function filterBy(array, search, atribute) {
    // filtra array de objetos
    // 1 parametro array afiltrar
    // 2 parametro de busqueda
    // 3 parametro atributo a filtrar
    if (array){
      return array.filter(
      (e) =>
          e[atribute] && e[atribute].toLowerCase().includes(search.toLowerCase())
    )}
}
export default function SerchFilter(
    {setFilter,  
    array, 
    atribute = 'id', 
    placeholder= 'Search...' })
    {
    // filtra array de objetos devuelve componente de busqueda
    const [filterBySearch, setFilterBySearch] = useState("");
    let filter = filterBy(array, filterBySearch, atribute);
    const filtroBusqueda = function (e) {
        setFilterBySearch(e);
    };
    useEffect(() => {
        setFilter(filter)   
        // console.log(setFilter)
    },[filterBySearch])
   
    return(
        <div className="relative flex w-1/2 flex-wrap items-stretch">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
            </span>
            <input 
                type="text"
                className='className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10' 
                placeholder={placeholder} 
                onChange={(e) => filtroBusqueda(e.target.value)}
                value={filterBySearch}
            />
        </div>
    )
}