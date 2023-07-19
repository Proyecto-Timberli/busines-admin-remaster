
import React , {useEffect, useState} from "react";
import Icon from '@mdi/react';
import { mdiCartPlus } from '@mdi/js';
import { mdiCartRemove } from '@mdi/js';


function existe(arrayDeObjetos,atributo,valor){
  for(let i=0;i<arrayDeObjetos.length;i++){
    if(arrayDeObjetos[i][atributo]===valor){
      return true
    }
  }
  return false
}

const CardProduct = (
  {id, name, category, price, product, productInStore, reflectedStock, setReflectedStock, car,setCar})=>{

  const [cantidad,setCantidad]= useState(1)
  
  ///////////////////////////////////////////////////////////////
  function reflectStock(carAmountChanged){
    //Refleja el stock
    let productSave = productInStore.filter(i=>i.id===id)
    let productAmount = carAmountChanged.filter(i=>i.id===id)

    const updatedStock = [...reflectedStock]
    for(let i=0;i<updatedStock.length;i++){
      if(updatedStock[i].id===id){
        updatedStock[i]={...updatedStock[i],stock:Number(productSave[0].stock)+Number(productAmount[0].amount)}
      }
  }
    setReflectedStock([...updatedStock])  
  }   

  function remove(product){
    setReflectedStock(reflectedStock.filter(p=>p.id!=product.id))    
  }
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    //Cuando cantidad vea cambios
    if(!existe(car,"id",id)){
      //Se carga el producto dentro de el car
      const carUpdated = [...car,{id:id,name:name,amount:cantidad,price:price}]
      setCar(carUpdated )
      reflectStock(carUpdated)
    }else{
      if(cantidad===0){
        //El producto se elimina del  car y del reflex stock
        setCar(car.filter(i=>i.id!=id))
        remove(product)
      }
      else{
        //Refleja cantidades de productos, y ejecuta reflect stocks
        // let carAmountChanged = [...car]
        let carAmountChanged = [...car]
        for(let i=0;i<carAmountChanged.length;i++){
          if(carAmountChanged[i].id===id){
            carAmountChanged[i]={...carAmountChanged[i],amount:cantidad}
          }
        }
        setCar(carAmountChanged)
        reflectStock(carAmountChanged) 
      }
    }
  },[cantidad])

    function addAmount(){
      setCantidad(cantidad+1)
    }
    function removeAmount(){
      setCantidad(cantidad-1)
    }
    return (
      <div className="relative flex flex-col min-w-0 break-words bg-slate-300 rounded shadow-lg dark:bg-stone-700  py-3 xl:my-2 max-xl:my-2">
        <div className="flex flex-wrap justify-around items-center">
          <div className="flex flex-wrap justify-around items-center w-10/12 h-full">    
            <p className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">{name}</p>
            <p className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">{category}</p>
            <p className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">{price} </p>
          </div >
          <div className="flex flex-row justify-between items-center"> 
            <button onClick={()=>removeAmount()} className='mx-2'>
              <Icon path={mdiCartRemove } size={1} color={'white'}/>
            </button>
            <p className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs">Cantidad: {cantidad}</p>
            <button onClick={()=>addAmount()} className='mx-2'>
              <Icon path={mdiCartPlus } size={1} color={'white'}/>
            </button>
          </div>
        </div>
      </div>
    );
  


};


export default CardProduct;
