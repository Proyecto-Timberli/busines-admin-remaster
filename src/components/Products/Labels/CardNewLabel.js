import React from "react";

export default function CardNewLabel({
  selectOn,
  onPress
}) {
  return (
    <>
      <div 
        className={selectOn?"relative flex flex-col min-w-0 break-words bg-slate-300 rounded  xl:mb-0 shadow-lg dark:bg-stone-700  py-3 xl:my-4 max-xl:my-2":
          "relative flex flex-col min-w-0 break-words bg-slate-500 rounded  xl:mb-0 shadow-lg dark:bg-stone-950  py-3 xl:my-4 max-xl:my-2"}
        >
        <div className="flex flex-wrap justify-around items-center">
          <button 
            className="flex flex-wrap justify-around items-center w-10/12 h-full"
            onClick={() => onPress(null)}>  
          <span className="font-semibold text-x text-blueGray-700 dark:text-slate-300">
            Nueva Etiqueta
          </span>            
         </button> 
        </div>
      </div>
    </>
  );
}

