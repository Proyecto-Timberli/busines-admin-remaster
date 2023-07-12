////////////////////////////////////////////////////
import './Sells.css'
import React, {useEffect, useState } from "react";
////////////////////////////////////////////////////
import {useAuth} from '../../Context/authContext'
import {getFirestore, collection, getDocs } from 'firebase/firestore';
import Loading from '../Reusables/Loading'
import CardVenta from './CardSell'
import { useNavigate } from 'react-router';
import {useLocation} from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
const inconColor =("rgb(52, 51, 72)")

export default function Ventas(){
    console.log("------------------------")
    console.log("Ventas")
    const {userProfile} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    //////////////////////filtro por cliente///////////////////////////////

    const idClient = location.state? location.state : null
    ////////////////////conexion Api////////////////////////////
    const [salesApi,setSalesApi]=useState(null)
    const getVentas =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/sales")
        getDocs(selectedC)
        .then(res => setSalesApi(res.docs.map(sale=>({id:sale.id,...sale.data()}))))
    }
    useEffect(() => {
        if(userProfile){
           getVentas()
        }
    },[])
    let dataRender = []
    if(idClient){
        dataRender= salesApi?.filter(sale=> sale.idClient===idClient)
    }else{
        dataRender = salesApi
    }
    /////////////////////////////////////////////////////
    
    
    function filtroName(array, search, attibute) {
        if (!array){return} 
        return array.filter(
        (e) =>
            e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
        );
    }
    const [filterBySearch, setFilterBySearch] = useState("");
    let filtro = filtroName(salesApi, filterBySearch, "id");
    const filtroBusqueda = function (e) {
        setFilterBySearch(e);
    };

    if (filterBySearch !== "") {
        dataRender=filtro
    }
   /////////////////////////////////////////////////////
    //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

   console.log("------------------------")
   /////////////////////////////////////////////////////
    return(
        <div className='container-MenuProductos'>
                <div className='imgBackGroundCustom'></div>
                {idClient&&
                    <div className='container-nav-MenuProductos'>
                    <div className='button-Container-MenuProductos'>
                        <button className='button-MenuProductos' onClick={() => navigate(-1)}>    
                            <Icon path={mdiArrowLeft} size={2} color={inconColor} />   
                        </button>
                    </div>
                </div>}
        <div className='container-Sells'>
            {!idClient&&<input
                    className='textInput-Sells'
                    onChangeText={(e) => filtroBusqueda(e)}
                    value={filterBySearch}
                    placeholder="Buscar venta..."
                /> }                      
            
            <div className='lista-Sells'>
                <p className='text-Sells'>Nro Venta</p>
                <p className='text-Sells'>Total</p>
                <p className='text-Sells'>Fecha </p>
            </div>
            <div className='container2-Sells'>
            {!salesApi?<Loading/>:
            dataRender.map(item=>
                <button 
                    className='buttonCard-Sells'
                    onClick={() => navigate("/sellresumen",{state:item})}>  
                    <CardVenta
                        key={item.id+"p"}
                        id={item.id}
                        total={item.total?financial(item.total):null}
                        fecha={formatDate(item.createdDate).formatDate+" / "+formatDate(item.createdDate).hora}
                        resumen={item.sellProducts}
                        // client={item.client}
                        // idClient={item.idClient}
                        // wayToPay={item.wayToPay}
                    />
                </button> )}
            </div>     
        </div>   
        </div>
    )

}

