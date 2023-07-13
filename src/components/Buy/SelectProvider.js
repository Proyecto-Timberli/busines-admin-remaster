import React, {useEffect, useState}  from "react";
import SelectComponent from '@/components/Reusables/Select'
import { getProviders } from "@/apiFunctions/endPoints";
import { useAuth } from "@/context/authContext";

export default function selectprovider({
  setState, 
  state
}) {
    const { userProfile, userPermissions } = useAuth()
    const [providers, setProviders] = useState([])


    useEffect(()=>{
        getProviders(userProfile, setProviders)
        console.log(providers)
    },[userProfile])

  return (
    <>
          <SelectComponent
            text={'Provedor'}
            text2={state?.identifier}
            objValue={'identifier'}
            arraySelects={providers}
            selectFunction={setState}
        />
    </>
  );
}
