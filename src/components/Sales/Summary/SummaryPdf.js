
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { formatDate, financial } from '@/apiFunctions/apiFunctions';

export default function ResumenPdf({sale,businessDate}){
    const {negocio,de,cuit,telefono,} = businessDate.myBusiness
    const {createdDate,id,client,idClient,wayToPay,total,sellProducts} = sale
    const qrDom = document.getElementById(id).toDataURL()
    console.log(qrDom )
    
return(
    <>
    <Document>
        <Page size='A4'>
        <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <View style={{display:'flex',width:'100%',height:'auto',justifyContent:'center',alignItems:'center'}}>
                <View style={{width:'20px',height:'20px',display:'flex',justifyContent:'center',alignItems:'center',borderColor:'black', borderWidth:'1',borderStyle:'solid',marginTop:'1%'}}>
                    <Text style={{fontSize:'16px', fontWeight:'bold'}}>X</Text>
                </View>
                <Text style={{fontSize:'12px',marginTop:'1%'}}>No valido como factura</Text>
            </View>
            <View style={{width:'92%',display:'flex',flexDirection:'row',marginBottom:'4%',paddingBottom:'5%',justifyContent:'center',alignItems:'center',borderColor:'black', borderWidth:'1',borderStyle:'solid'}}>
                <View style={{width:'50%',height:'auto',paddingLeft:'5%',paddingTop:'5%'}}>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>{negocio}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>{de}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Cuit: {cuit}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Telefono: {telefono}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Fecha:{" "+formatDate(createdDate).formatDate+" / "+formatDate(createdDate).hora}</Text>
                    <Text style={{fontSize:'12px',textAlign:'left'}}>Nro de venta: {id}</Text>
                    {client&&<><Text style={{width:'80%',fontSize:'12px',textAlign:'left'}}>Cliente: {client}</Text>
                    <Text style={{width:'80%',fontSize:'12px',textAlign:'left'}}>Nro de Cliente: {idClient}</Text></>}
                    <Text style={{width:'80%',fontSize:'12px',textAlign:'left'}}>Forma de pago: {wayToPay}</Text>
                </View>
                <View style={{width:'41%',height:'auto',paddingTop:'5%',paddingLeft:'10%'}}>
                   <Image allowDangerousPatchs src={qrDom}  style={{width:'120px', height:'120px'}}/>
                </View>
            </View>
            {sellProducts.map(product=> 
            <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:'2%'}}>
                <Text style={{width:'83.6%',fontSize:'12px',textAlign:'left'}}>Producto: {product.name}</Text>
                <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{width:'30%',fontSize:'12px',textAlign:'center'}}>Precio: ${product.priceSelect?product.priceSelect:""}</Text>            
                <Text style={{width:'30%',fontSize:'12px',textAlign:'center'}}>Cantidad: {product.amount}</Text>          
                <Text style={{width:'30%',fontSize:'12px',textAlign:'center'}}>Total cantidad ${product.priceSelect*product.amount}</Text> 
                </View>  
                <View style={{width:'92%',borderStyle:'solid',borderColor:'black',borderBottomWidth:'0.5'}}></View>   
            </View>)}
        <Text style={{width:'80%',fontSize:'12px',textAlign:'right',marginTop:'4%'}}>Total: ${total}</Text>
        </View>
        </Page>
    </Document>
    </>
)
}