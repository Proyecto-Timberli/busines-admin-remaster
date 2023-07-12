import React  from "react";
import SelectComponent from '@/components/Reusables/Select'

export default function selectWayToPay({
  setState,
  state 
}) {

  return (
    <>
          <SelectComponent
            text={'Forma de pago'}
            text2={state.name}
            arraySelects={[
            {id:"Efectivo",name:"Efectivo"},
            {id:"Debito",name:"Debito"},
            {id:"Credito",name:"Credito"},
            {id:"Transferencia",name:"Transferencia"}
            ]}
            selectFunction={setState}
        />
    </>
  );
}
