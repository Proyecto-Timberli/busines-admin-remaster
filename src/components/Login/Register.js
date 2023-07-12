"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import {useAuth} from '@/context/authContext'
// import validateForm from '../register/validation.js';
export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = '*ingresa un email'
  // }else if (emailRegex.test(input.email)){
  //   errors.email = '*formato incorrecto'
  }
  if (!input.password){
    errors.summary = '*ingresa una contraseña'
  }else if (input.password.length < 6){
    errors.password = '*debe contener al menos 6 caracteres'
  }else if (input.password.length > 60){
    errors.password = '*no puede contener mas de 60 caracteres'
  }
  if(input.passwordCopia !== input.password){
    errors.passwordCopia = '*contraseña incorrecta'
  }
  
  return errors;
};
function Register(){
  const router = useRouter()
  const [formErrors, setFormErrors] = useState(false)
    const initalState = {
        email: "",
        password: "",
        passwordCopia: "",
      };
      const [state, setState] = useState(initalState);
    useEffect(()=>{
        console.log(state)
    },[state])
    
      const handleChangeText = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
      };
      const {signup} = useAuth()
      const handleSubmit = async () => {
        try{
          setFormErrors(true)
          if(Object.keys(validate(state)).length){
            console.log(validate(state))
          }else{
            console.log('creando....')
            let create = null
            create = await signup(state.email, state.password)
            if(Object.keys(create)[0]==='error'){
              setFormErrors(create)
            }else if(Object.keys(create)[0]==='successful'){
              router.push("/auth")
            }
          }  
          
        }
        catch(error){
          setFormErrors('no se pudo registrar la cuenta')
        }
        
      };
  
    return (
      <>
      <div className='container mx-auto h-full pt-7 pb-7 flex justify-center items-center'>
      <div className="container mx-auto px-4 h-full mt-20 pt-7 pb-2 bg-blueGray-700">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 dark:bg-stone-950">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150 dark:bg-stone-600 dark:text-slate-200"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={state.email}               
                      onChange={handleChangeText}               
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-600 dark:text-slate-200"
                      placeholder="Email"
                    />
                  </div>
                  <div className='h-6 flex items-center'>   
                  {validate(state).email&&formErrors&&
                  <p className='text-red-600'>{validate(state).email}</p>}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-600 dark:text-slate-200"
                      placeholder="Password"
                      type='password'
                      name='password'
                      value={state.password}                 
                      onChange={handleChangeText}
                    />
                  </div>
                  <div className='h-6 flex items-center'>    
                  {validate(state).password&&formErrors&&
                  <p className='text-red-600'>{validate(state).password}</p>}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Repeat password
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 dark:bg-stone-600 dark:text-slate-200"
                      placeholder="Repeat password"
                      type='password'
                      name='passwordCopia'             
                      onChange={handleChangeText}
                    />
                  </div>
                  <div className='h-6 flex items-center'>     
                  {validate(state).passwordCopia&&formErrors&&
                  <p className='text-red-600'>{validate(state).passwordCopia}</p>}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150 dark:bg-stone-600 dark:text-slate-200"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className='h-3.5'> 
                    {Object.keys(formErrors)[0]==='error'&&
                    <p className='text-red-600'>{formErrors.error}</p>} 
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Create account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
    )
}

export default Register;