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
          <h5 className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">
            {id}  
          </h5>
          <span className="font-semibold text-x text-blueGray-700 dark:text-slate-300">
            {name}
          </span>      
          <span className={" text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs"}>
            {phone}
          </span>
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">{location}</span>        
        </div>
      </div>
    </>
  );
}

