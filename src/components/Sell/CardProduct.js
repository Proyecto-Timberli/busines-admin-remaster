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
            className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">
            {id}  
          </h5>
          <span className="font-semibold text-x text-blueGray-700 dark:text-slate-300">
            {name}
          </span>      
          <span className={" text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs"}>
            {category}
          </span>
          <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">
            {price}
          </span>        
        
      
    </>
  );
}

