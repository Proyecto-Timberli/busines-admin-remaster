import React, { useEffect, useState } from "react";
import SelectComponent from '@/components/Reusables/Select'
import {ordenamiento} from '@/otherFunctions/orders'


function AlphabeticalOrder({array, setFilter}){
  const [orderSelect,setOrderSelect]= useState({id:"asc",name:"ASC"})
  function alphabeticalOrderFilter(label){
    if (!array){return} 
    if (!label){return}
    if (label.name==='ASC'){setFilter(ordenamiento(array,'identifier'))}
    if (label.name==='DESC'){setFilter(ordenamiento(array,'identifier','desc'))}
    return
  }
  useEffect(() => {
    alphabeticalOrderFilter(orderSelect)
  },[orderSelect]);
  return(
    <SelectComponent
      text={'Orden alfabetico'}
      text2={orderSelect.name}
      arraySelects={[
        {id:"asc",name:"ASC"},
        {id:"desc",name:"DESC"},
        ]}
      selectFunction={setOrderSelect}
    />
  )
}

export default function  Orders({
  setFilter, 
  array,
}) {

  return (
    <>
      <AlphabeticalOrder array={array} setFilter={setFilter}/>
    </>
  );
}
