import swal from "sweetalert";
import './Alerts.css';

function alertCustom2(text){
    
    swal({
        title:text,
        text:text,
        icon:"success",
        // icon:"info",
        // icon:"error",
        // icon:"warning",
        // buttons: "Aceptar",
        buttons:["No","Si"],
        // timer:"2000",
    })
}

export  function alertConfirmacion(pregunta,text,functionAlert,textError){  
    swal({
        title:pregunta,
        text:text,
        icon:"warning",
        buttons:["No","Yes"],
    })
    .then(async res =>{
        if(res){
            if(functionAlert){
                const response = await functionAlert()
                if(Object.keys(response)[0]==='error'){
                    swal({
                        text:response.error,
                        icon:'error',
                        timer:"4000",
                    })
                }else if(Object.keys(response)[0]==='success'){
                    swal({
                        text:response.success,
                        icon:"success",
                        timer:"4000",
                    })
                }else{
                    swal({
                        text:'Accion Invalida',
                        icon:'error',
                        timer:"4000",
                    })
                }
            }else{
                swal({
                    text:'Accion Invalida',
                    icon:'error',
                    timer:"4000",
                })
            }
        }
    })
}
export  function alertInformation(title,text,title2,text2){
    swal({
        title:title,
        text:text,
        icon:"info",
        buttons:["Ok","Next"],
    })
    .then(res=>{
        if(res){
            swal({
                icon:"info",
                title:title2,
                text:text2,
            })          
        }
    })
}
export  function  alertForm(title, text, checkOk, placeholder="Write the name of your company"){
    swal({
        title:title,
        text:text,
        icon:"warning",
        content: {
            element: "input",
            attributes: {
              placeholder: placeholder,
            },
        },
        buttons:["Cancel","Ok"],
        
    })
    .then(async(res) => {
        if(res){
            const valueRes = await checkOk(res)
            if(valueRes.value || valueRes.success){
                swal({
                    icon:"success",
                }) 
            }else{
                swal({
                    title:valueRes.error,
                    icon:"error",
                })  
            }        
        }else if(res===null){
        }
        else{
            swal({
                title:'Completa el campo',
                icon:"error",
            })  
        }
    })
}
