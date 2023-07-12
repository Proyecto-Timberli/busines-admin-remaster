'use client'
import React, { useEffect,useState} from "react";
import {postFirestoreId} from '@/apiFunctions/apiFunctions'
import {useAuth} from '@/context/authContext'
import {getFirestore,doc, getDoc} from 'firebase/firestore';
import Loading from '../Reusables/Loading'

import { useRouter } from 'next/navigation'

const Starting =  ()=> {
    const router = useRouter() 
    console.log("------------------------")
    console.log("Starting")
    const {user} = useAuth()
    const [state,setState]=useState(null)
    const postUser = async()=>{
        const docRef = await doc(getFirestore(),"users/"+user.uid)
        await getDoc(docRef).then(res => res.data()?setState(res.data()):setState("identifierNONE")).catch(err => console.log(err))
    }
    useEffect(() => {
        console.log("Inicializando Cuenta")
        if (user?.uid){ 
            console.log(user.uid)
            postUser()  }
        console.log("---user.uid----")
        console.log(user)
    },[user])
    useEffect(() => {
        if (state){                                
            if(state=="identifierNONE"){
                const docRef =doc(getFirestore(),"users/"+user.uid)
                postFirestoreId(docRef,{identifier:user.email})
                router.push("/profiles")
            
            }else{
                console.log(state.identifier)
                router.push("/profiles")
            } 
        }
    },[state])
    console.log("------------------------")
    return (
        <div className='container h-screen flex justify-center items-center'>
            <div className="container flex justify-center items-center"> 
                <Loading/>
            </div>
        </div>
    )
}


export default Starting