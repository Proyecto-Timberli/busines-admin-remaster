"use client"

import React, { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext'
import Loading from '@/components/Reusables/Loading'
import Header from './HeaderBuy'
import Footer from '@/components/Footers/FooterAdmin'
import CardProductInCart from "./CardProductInCartBuy";
import {getProducts, putProducts, postBuy} from '@/apiFunctions/endPoints'
import { financial, exist } from '@/apiFunctions/apiFunctions';
import ProductsInStore from './ProductsInStoreBuy'
import {Timestamp} from 'firebase/firestore';
import { alertConfirmacion } from '@/components/Reusables/Alerts'



export default function Sell(){
  const { userProfile, userPermissions } = useAuth()
  const [wayToPay, setWayToPay] = useState({id:"Efectivo",name:"Efectivo"})
  const [provider, setProvider] = useState(null)
  const [car, setCar] = useState([])
  const [total, setTotal]= useState(0.00);
  const [reflectedStock, setReflectedStock]= useState([])
  const [productInStore, setProductInStore]= useState([])
  const [storeVisible, setStoreVisible]= useState(false)

  useEffect(()=>{
    getProducts(userProfile, setProductInStore)
  },[userProfile])

  const addProducts = ()=>{
    //suma todos los productos
    let value = 0
    car?.forEach(product =>{
      value=(value+(product.amount*product.price))})
    setTotal(value)
  }
  useEffect(() => {
    addProducts()
  },[car])

  const addProductToCar = (product)=>{
    if(!exist(car,'id', product.id)){
      setCar([...car, product])
      setReflectedStock([...reflectedStock, {...product, stock:Number(product.stock)+1}])
    }
    setStoreVisible(false)
  }
  function clean (){
    setWayToPay({id:"Efectivo",name:"Efectivo"})
    setProvider(null)
    setCar([])
    setTotal(0.00)
    setReflectedStock([])
    setStoreVisible(false)
    return {success:'clean cart!'}
  }

  async function register(ventar=car, productos=reflectedStock){
    try{
      if(!ventar[0]){
        return {error:'There are no products in the cart'}
              
      }else{
        let postVentar =  {
          idProvider: provider?.id?provider.id:null,
          provider: provider?.identifier?provider.identifier:null,
          total: total,
          buyProducts: ventar,
          createdDate: Timestamp.now().toDate().toString(),
          wayToPay: wayToPay?wayToPay.name:null
        }
        let response = await postBuy(userProfile, postVentar)
        console.log(productos)
        await putProducts(userProfile, productos)
        clean()
        return response
      }
    }catch(error){
      return {error: error.message}
    }
  }
            
  
       

  return (
    <>
      <Header 
        setWayToPay={setWayToPay} 
        wayToPay={wayToPay}
        addProduct={()=>setStoreVisible(true)} 
        productInStore={productInStore}
        setProductInStore={setProductInStore}
        clean={()=>alertConfirmacion('Clean cart', null, clean, null)}
        setProvider={setProvider}
        provider={provider}
        register={()=>alertConfirmacion('Register buy?', null,register, null)}
        />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
      {storeVisible&&
      <ProductsInStore 
        productInStore={productInStore}
        pressCart={addProductToCar}
        setStoreVisible={()=>setStoreVisible(false)}
      />}  
        <div className="relative flex flex-col h-auto py-4 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
          <div className="rounded-t mb-0 px-4 py-3 w-full bg-transparent">
            <div className="flex w-full flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                  Cart
                </h6>  
                {car?.map(item=>
                <CardProductInCart
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price?financial(item.price):null}
                  product={item} 
                  productInStore={productInStore}
                  car={car}
                  setCar={setCar} 
                  reflectedStock={reflectedStock}
                  setReflectedStock={setReflectedStock}
                />            
              )}
                <div className="w-full border-solid border-b-2 border-slate-300 dark:border-stone-700 mt-6"></div>
                <div className="w-full flex justify-end bg-slate-300 rounded shadow-lg dark:bg-stone-700 py-2 px-12 mt-6">
                <span className="text-blueGray-700 dark:text-slate-300 uppercase font-bold text-xs ">
                  Total: {total}
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer/> 
     </div>
    </>
  );
}
