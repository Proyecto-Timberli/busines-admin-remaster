import React from "react";

export default function CardProvider({
  id,
  name,
  phone,
  location,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded  xl:mb-0 shadow-lg dark:bg-stone-700  py-3">
        <div className="flex flex-wrap justify-around items-center">
          <h5 className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            {id}  
          </h5>
          <span className="font-bold text-xs uppercase text-blueGray-700 dark:text-slate-300 lg:w-1/4">
            {name}
          </span>      
          <span className={" text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4"}>
            {phone?phone:'Sin telefono'}
          </span>
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            {location?location:"Sin ubicacion"}</span>        
        </div>
      </div>
    </>
  );
}

