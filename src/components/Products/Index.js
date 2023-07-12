"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext'
import { getCategories, getProducts } from '@/apiFunctions/endPoints'
import Header from './Header'
import Products from './Products'
import Footer from '@/components/Footers/FooterAdmin'
import { useRouter,} from "next/navigation";

export default function ProductsIndex() {
  const router = useRouter();
  const {userProfile,} = useAuth()

  const [productsApi, setProductsApi]=useState([])
  const [categoriesApi, setCategoriesApi]= useState([])
  const [dataRender, setDataRender]=useState([])

  useEffect(() => {
    if(userProfile){
      getCategories(userProfile, setCategoriesApi)
      getProducts(userProfile,  setProductsApi)
    }
  },[userProfile]) 

  useEffect(() => {
    setDataRender([...productsApi])
    console.log(categoriesApi)
  },[productsApi])
  
  return (
    <>
      <Header
        setFilter = {setDataRender} 
        array = {productsApi}
        labels= {categoriesApi}
        onPress = {()=>router.push('inside/products/add')}
        onPressLabels = {()=>router.push('inside/products/labels')}
      />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <Products 
          productsApi = {productsApi} 
          dataRender = {dataRender}
          setProductsApi = {()=>getProducts(userProfile,  setProductsApi)}/>
        <Footer/> 
     </div>
    </>
  );
}
