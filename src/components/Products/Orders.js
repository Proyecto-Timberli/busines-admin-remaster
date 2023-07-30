import React, { useEffect, useState } from "react";
import SelectComponent from '@/components/Reusables/Select'
import {ordenamiento} from '@/otherFunctions/orders'


function AlphabeticalOrder({array, setFilter}){
  const [orderSelect,setOrderSelect]= useState({id:"ASC",name:"ASC"})
  useEffect(() => {
    alphabeticalOrderFilter(orderSelect)
  },[orderSelect]);
  function alphabeticalOrderFilter(label){
    if (!array){return} 
    if (!label){return}
    if (label.name==='ASC'){setFilter(ordenamiento(array,'name'))}
    if (label.name==='DESC'){setFilter(ordenamiento(array,'name','desc'))}
    return
  }
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

function PriceOrder({array, setFilter}){
  const [orderPriceSelect,setOrderPriceSelect]= useState({id:"NINGUNO",name:"NINGUNO"})
  useEffect(() => {
    priceOrderFilter(orderPriceSelect)
  },[orderPriceSelect]);
  function priceOrderFilter(label){
    if (!array){return} 
    if (!label){return}
    if (label.name==='MENOR'){setFilter(ordenamiento(array,'price'))}
    if (label.name==='MAYOR'){setFilter(ordenamiento(array,'price','desc'))}
    return
  }
  return(
    <SelectComponent
      text={'Orden por precio'}
      text2={orderPriceSelect.name}
      arraySelects={[
        {id:"MAYOR",name:"MAYOR"},
        {id:"MENOR",name:"MENOR"},
        {id:"NINGUNO",name:"NINGUNO"},
        ]}
      selectFunction={setOrderPriceSelect}
    />
  )
}

function StockOrder({array, setFilter}){
  const [orderStockSelect,setOrderStockSelect]= useState({id:"NINGUNO",name:"NINGUNO"})
  useEffect(() => {
    stockOrderFilter(orderStockSelect)
  },[orderStockSelect]);

  function stockOrderFilter(label){
    if (!array){return} 
    if (!label){return}
    if (label.name==='MENOR'){setFilter(ordenamiento(array,'stock'))}
    if (label.name==='MAYOR'){setFilter(ordenamiento(array,'stock','desc'))}
    return
  }
  return(
    <SelectComponent
      text={'Orden por stock'}
      text2={orderStockSelect.name}
      arraySelects={[
        {id:"MAYOR",name:"MAYOR"},
        {id:"MENOR",name:"MENOR"},
        {id:"NINGUNO",name:"NINGUNO"},
        ]}
      selectFunction={setOrderStockSelect}
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
      <PriceOrder array={array} setFilter={setFilter}/>
      <StockOrder array={array} setFilter={setFilter}/>
    </>
  );
}
