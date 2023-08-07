import React from "react";
import { formatDate, financial } from '@/apiFunctions/apiFunctions';

export default function CardStats({
  id,
  date,
  total,
  provider,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded  xl:mb-0 shadow-lg dark:bg-stone-700 py-1 ">
        <div className="flex flex-wrap justify-around items-center">
          <h5 className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            {id}  
          </h5>
          <span className="font-bold text-xs text-blueGray-700 dark:text-slate-300 lg:w-1/4">
            {financial(total)}
          </span>      
          <p className="text-sm text-blueGray-700 dark:text-slate-300 mt-4 lg:w-1/4" >
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            {provider?provider:"No asignado"}
          </span>
          </p>
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">{formatDate(date).formatDate+" / "+formatDate(date).hora}</span>
          
        </div>
      </div>
    </>
  );
}



