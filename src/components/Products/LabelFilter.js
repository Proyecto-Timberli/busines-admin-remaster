import React, { useEffect, useState } from "react";
import SelectComponent from '@/components/Reusables/Select'

export default function  LabelFilter({
  setFilter, 
  array,
  labels=[],
}) {

  const [labelSelect,setLabelSelect]= useState({name:'Ninguna'})
  useEffect(() => {
    labelFilter(labelSelect)
  },[labelSelect]);
  function labelFilter(label) {
    if (!array){return} 
    if (!label){return}
    if (label.name==='Ninguna'){return setFilter(array)}
    return (
        setFilter(array.filter((e) =>e.category && e.category.includes(label.name)))     
    )
  }
  return (
    <>
        <SelectComponent
            text={'Selecciona una etiqueta'}
            text2={labelSelect.name}
            arraySelects={[...labels,{id:'Ninguna',name:'Ninguna'}
            ]}
            selectFunction={setLabelSelect}
        />
    </>
  );
}
