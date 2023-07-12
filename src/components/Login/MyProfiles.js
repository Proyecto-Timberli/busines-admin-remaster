"use client"
import {useState, useEffect, } from 'react'
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
import {postFirestoreId} from '@/apiFunctions/apiFunctions'
import {useAuth} from '@/context/authContext'
import { useRouter } from 'next/navigation'
import Loading from '../Reusables/Loading'
import Icon from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';
import { mdiPlusBox } from '@mdi/js';
import {alertInformation, alertForm} from '@/components/Reusables/Alerts'

const MyProfiles=()=>{
    console.log("------------------------")
    console.log("MyProfiles")
    const router = useRouter()
    const {user,changedProfile} = useAuth()
    const [myProfilesApi,setMyProfilesApi]= useState(null)

    const getProfilesApi = async ()=>{
        const selectedCollection= await collection(getFirestore(), "users/"+user.uid+"/myProfiles")
        return getDocs(selectedCollection).then((res) => {
            setMyProfilesApi(res.docs.map(profile=>({id:profile.id,...profile.data()})))
            console.log('successful');
            return {value:true, res:'successful'}
        })
        .catch((res)=> {
          console.log(res.message);
          return {value:false, res:res.message}
        })
    }
    const postMyBusinessProfile = async (name)=>{
        const selectedCollection = doc(getFirestore(), "users/"+user.uid+"/myProfiles/"+user.uid)
        const res = await postFirestoreId(selectedCollection,{name:name,uidEntry:user.uid})
        await getProfilesApi() // actualizamos profiles
        return res // retornamos res para captar la respuesta en el alert.
    }
    useEffect(() => {
        console.log(user)
      getProfilesApi()
    },[user])

    const [hasProfile,setHasProfile]= useState([1])
    //limitando los perfiles a crear
    useEffect(() => {
        setHasProfile(myProfilesApi? myProfilesApi.filter((e) => e.id && e.id.includes(user.uid)):[1])
    },[myProfilesApi])
    let dataRender = myProfilesApi  
    ////////////////////////////////////////////////////////////////////    
   
    return( 
        <div className='container relative pt-16 items-center flex flex-wrap min-h-screen  justify-center px-7 lg:px-20 dark:bg-neutral-950'>
                <h2 className="font-semibold text-4xl text-blueGray-600 dark:text-white py-3">
                    Choose a profile</h2>
                <div className='flex flex-row'
                    onClick={()=>alertInformation("Profiles",'The user can enter with different profiles, which can have different levels of access to our functionalities.','Create a profile','When you enter for the first time you must create the main profile. To create others profiles you must access your business settings.')}>
                    <Icon 
                        className='bg-fuchsia-500 rounded-full dark:bg-fuchsia-950 ml-2'
                        path={mdiInformationOutline} 
                        color={'#ffffffdf'}size={1}  />
                    <p className='font-semibold text-lightBlue-500 '>nformation</p>
                </div>
                <div className='container h-auto flex flex-wrap justify-center items-center'>{hasProfile.length?null:
                    <button  onClick={() => alertForm('Profile','Name your founder profile, it is recommended that it bear the name of the company.',(e)=>postMyBusinessProfile(e))} className='w-72 h-32 bg-blueGray-700 mx-2 my-2 flex flex-col justify-center items-center rounded-2xl'>
                        <Icon path={mdiPlusBox} size={2} color="#ffffffdf"/>
                            <p className='text-md  font-bold text-white'>First profile</p>
                    </button>}
                    {!myProfilesApi?<Loading/>:
                    <>{dataRender.map(item=>
                        <button
                            onClick={() => {
                                changedProfile(item.uidEntry,item)
                                router.push("/inside")
                            }}
                            className='w-72 h-32 bg-blueGray-700 mx-2 my-2 flex flex-col justify-center items-center rounded-2xl'>
                                <p className='text-xl font-bold text-white'>{item.name}</p>
                                {item.from&&<p className='text-md font-semibold mt-2 text-slate-300 ' >from: {item.from}</p>}   
                        </button>)}</>}
                </div>
        </div>
    )
}

export default MyProfiles
