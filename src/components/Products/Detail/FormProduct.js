import React, { useState } from "react";
import { useAuth } from '@/context/authContext'
import { putProduct } from '@/apiFunctions/endPoints'
import { alertConfirmacion } from '@/components/Reusables/Alerts'

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = '*ingresa un nombre'
  }
  else if (input.name.length >= 400){
    errors.name = '*No puede tener mas de 400 caracteres'
  }
  if (input.price && (typeof Number(input.price) !== 'number' || isNaN(Number(input.price)))){
    errors.price = '*Debe ingresar solo numeros sin otros caracteres'
  }
  if (input.priceList2 && (typeof Number(input.priceList2 ) !== 'number' || isNaN(Number(input.priceList2)))){
    errors.priceList2  = '*Debe ingresar solo numeros sin otros caracteres'
  }
  if (input.priceList3 && (typeof Number(input.priceList3 ) !== 'number' || isNaN(Number(input.priceList3)))){
    errors.priceList3  = '*Debe ingresar solo numeros sin otros caracteres'
  }
  if (input.priceList4 && (typeof Number(input.priceList4 ) !== 'number' || isNaN(Number(input.priceList4)))){
    errors.priceList4  = '*Debe ingresar solo numeros sin otros caracteres'
  }
  if (input.stock && (typeof Number(input.stock) !== 'number' || isNaN(Number(input.stock)))){
    errors.stock = '*Debe ingresar solo numeros sin otros caracteres'
  }
  if (input.category && input.category.length >= 100){
    errors.category = '*No puede tener mas de 100 caracteres'
  }
  if (input.make && input.make.length >= 100){
    errors.make = '*No puede tener mas de 100 caracteres'
  }
  if (input.buyprice && (typeof Number(input.buyprice) !== 'number' || isNaN(Number(input.buyprice)))){
    errors.buyprice = '*Debe ingresar solo numeros sin otros caracteres'
  }
  if (input.description && input.description.length >= 100){
    errors.description = '*No puede tener mas de 400 caracteres'
  }

  return errors;
};
export default function FormProduct({product}) {
  const { userProfile } = useAuth()
  const {barCode, buyprice, category, description,id,image, make, name, price, priceList2, priceList3, priceList4 , stock} = product
  const [formState, setFormState] = useState({
    id:id,
    name: name?name:"",
    price: price?price:"",
    priceList2: priceList2?priceList2:"",
    priceList3: priceList3?priceList3:"",
    priceList4: priceList4?priceList4:"",
    stock : stock?stock:"",
    category: category?category:"",
    make: make?make:"",
    buyprice: buyprice?buyprice:"",
    barCode: barCode?barCode:"",
    image: image?image:"", 
    description: description?description:""
  })
  const [formErrors, setFormErrors] = useState(false)
  const handleChangeInput = (e)=>{
    setFormState({
      ...formState,
      [e.target.name]:e.target.value
    })
  }
  const saveChanges = () => {
    if(Object.keys(validate(formState)).length){
      setFormErrors(true)
    }else{
      const response = putProduct(userProfile, id , formState)
      return response
    }
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 dark:bg-stone-950">
        <div className="rounded-t bg-white mb-0 px-6 py-6 dark:bg-stone-950">
          <div className="text-center flex justify-between ">
            <h6 className="text-blueGray-500 text-sm font-bold ">Product id: {formState.id}</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>alertConfirmacion("Guardar cambios?", null, saveChanges, null)}
            >
              Guardar cambios
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0" >
          <form className="dark:bg-stone-950">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Informacion del producto
            </h6>
            <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.name}
                    name="name"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).name&&formErrors&&
                  <p className='text-red-600'>{validate(formState).name}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio
                  </label>
                  <input
                    
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.price}
                    name="price"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).price&&formErrors&&
                  <p className='text-red-600'>{validate(formState).price}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio 2
                  </label>
                  <input
                    
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.priceList2}
                    name="priceList2"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).priceList2&&formErrors&&
                  <p className='text-red-600'>{validate(formState).priceList2}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio 3
                  </label>
                  <input
                    
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.priceList3}
                    name="priceList3"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).priceList3&&formErrors&&
                  <p className='text-red-600'>{validate(formState).priceList3}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio 4
                  </label>
                  <input
                    
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.priceList4}
                    name="priceList4"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).priceList4&&formErrors&&
                  <p className='text-red-600'>{validate(formState).priceList4}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Stock
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.stock}
                    name="stock"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).stock&&formErrors&&
                  <p className='text-red-600'>{validate(formState).stock}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Etiqueta
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.category}
                    name="category"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).category&&formErrors&&
                  <p className='text-red-600'>{validate(formState).category}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Marca
                  </label>
                  <input
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.make}
                    name="make"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).make&&formErrors&&
                  <p className='text-red-600'>{validate(formState).make}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Precio de compra
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.buyprice}
                    name="buyprice"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).buyprice&&formErrors&&
                  <p className='text-red-600'>{validate(formState).buyprice}</p>}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Codigo de barra
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    value={formState.barCode}
                    name="barCode"
                    onChange={(e)=>handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-500 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Acerca del producto
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-700 dark:text-slate-300"
                    rows="4"
                    value={formState.description}
                    name="description"
                    onChange={(e)=>handleChangeInput(e)}
                  ></textarea>
                </div>
                <div className='h-6 flex items-center'>       
                  {validate(formState).description&&formErrors&&
                  <p className='text-red-600'>{validate(formState).description}</p>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
