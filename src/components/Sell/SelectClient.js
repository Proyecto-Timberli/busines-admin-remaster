import React, {useEffect, useState}  from "react";
import SelectComponent from '@/components/Reusables/Select'
import { getCustomers } from "@/apiFunctions/endPoints";
import { useAuth } from "@/context/authContext";

export default function selectCustomer({
  setState, 
  state
}) {
    const { userProfile, userPermissions } = useAuth()
    const [customers, setCustomers] = useState([])


    useEffect(()=>{
        getCustomers(userProfile, setCustomers)
        console.log(customers)
    },[userProfile])
    useEffect(()=>{
        console.log(customers)
    },[customers])

  return (
    <>
          <SelectComponent
            text={'Client'}
            text2={state?.identifier}
            objValue={'identifier'}
            arraySelects={customers}
            selectFunction={setState}
        />
    </>
  );
}
