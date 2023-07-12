import { setDoc, deleteDoc, addDoc } from 'firebase/firestore';

export const putFirestore = (selectedDoc, data)=>{
  return setDoc(selectedDoc, data)
    .then(function(res) {
      console.log(res)
      return ({value:true,res:res})})
    .catch(function(res) {
      console.log(res)
      return ({value:false,res:res.message})});  
}
export const deleteFirestore =(selectedDoc)=>{
  return deleteDoc(selectedDoc)
    .then(function(res) {
      console.log(res)
      return ({value:true,res:res})})
    .catch(function(res) {
      console.log(res)
      return ({value:false,res:res.message})});    
}
export const postFirestore = (selectedCollection,data)=>{
  return addDoc(selectedCollection, data)
    .then(function(res) {
      console.log(res)
      return ({value:true,res:res})})
    .catch(function(res) {
      console.log(res)
      return ({value:false,res:res.message})});   
}
export const postFirestoreId = (docRef,data)=>{
  return setDoc(docRef, data)
    .then(function(res) {
      console.log(res)
      return ({value:true,res:res})})
    .catch(function(res) {
      console.log(res)
      return ({value:false,res:res.message})});   
}

export const postFirestorePlus = (selectedCollection,array)=>{
    array.forEach(element => {
        addDoc(selectedCollection, element)
        .then(function(res) {
          console.log(res)
          return ({value:true,res:res})})
        .catch(function(res) {
          console.log(res)
          return ({value:false,res:res.message})});    
    });
    
}
export function formatDate (date){
    date=date.split(" ")
    const formatDate=(date[1]+" "+date[2]+" "+date[3])
    const hora=(date[4])
    const dia=(date[2])
    const mes=(date[1])
    const año=(date[3])
    return {formatDate: formatDate, hora:hora, mes:mes, año:año,dia:dia}
}
export function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

export function exist(arrayDeObjetos,atributo,valor){
  for(let i=0;i<arrayDeObjetos.length;i++){
    if(arrayDeObjetos[i][atributo]===valor){
      return true
    }
  }
  return false
}