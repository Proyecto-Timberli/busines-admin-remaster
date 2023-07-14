import React from "react";

export default function CardProduct({
  id, 
  name, 
  category, 
  price, 
}) {
  return (
    <>
          <h5 
            className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4">
            {id}  
          </h5>
          <span className="font-bold text-xs text-blueGray-700 uppercase dark:text-slate-300 lg:w-1/3">
            {name}
          </span>      
          <span className={" text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/4" }>
            {category}
          </span>
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs lg:w-1/6">
            {price}
          </span>        
        
      
    </>
  );
}

