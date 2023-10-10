import { getFirestore, doc , getDoc, collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
import { deleteFirestore, putFirestore, postFirestore, postFirestoreId } from '@/apiFunctions/apiFunctions'
 
// endpoint business information
//////////////////////////////////////////////////////////////////////////////
export const getBusiness = async (userProfile,setState)=>{
    let response = { error: 'The business was not geted' };
    try{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile)
        const businessData = await getDoc(selectedDoc)
        setState(businessData.data())
        response = {success: 'Business retrieved successfully'};
    }catch (error) {
        response = { error: error.message };
    }
    return response
}

export const postBusiness = async (userProfile, data)=>{
    let response = { error: 'No se han podiod actualizar los datos del negocio'};
    try {
      const selected = doc(getFirestore(), `users/${userProfile}`);
      await postFirestoreId(selected, data);
      response = { success:'Los datos del negocio fueron actualizados'};
    } catch (error) {
        response = { error: error.message };
    }
    return response
} 

// endpoint sales
//////////////////////////////////////////////////////////////////////////////
export const getSales =  async (setState,userProfile,loadingOff=()=>{return(null)})=>{
    let response = { error: 'The sales was not geted' };
    try {
        const selectedCollection = collection(getFirestore(), `users/${userProfile}/sales`);
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("createdDate",'desc')));
        const salesData = querySnapshot.docs.map((sale) => ({
          ...sale.data(),
          id: sale.id,
        }));
        setState(salesData);
        response = { success: 'Sales retrieved successfully', salesData };
        setTimeout(loadingOff, 500)
    } catch (error) {
        response = { error: error.message };
    }
    return response
}

export const getSale = async (userProfile,id,setState)=>{
    let response = { error: 'The client was not geted' };
    try{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/sales", id)
        const docSnapshot = await getDoc(selectedDoc)
        if (docSnapshot.exists()) {
            const salesData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(salesData);
            response = { success: 'Sales retrieved successfully', salesData };
        } else {
            response = { error: 'Sales not found' };
        }
    }catch (error) {
        response = { error: error.message };
    }
    return response
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////Cancel Sale/////////////////////////////////////
const deleteSale = async (userProfile, id)=>{
    //cancel sale
    // elimina venta de la base de datos
    let response = { error: 'No se ha podido eliminar la venta' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/sales", id)
        await deleteFirestore(selected)
        response = { success: 'Venta eliminada' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
const putProductsStock = async (userProfile, data)=>{
    //cancel sale
    // restablece el stock de los productos 
    let response = { error: 'los productos no fueron actualizados' };
    try {
      await Promise.all(
        data.map(async (product) => {
          const selected = doc(getFirestore(), `users/${userProfile}/products`, product.id);
          const obtainDoc = await getDoc(selected)
          const descomprimedDoc = {...obtainDoc.data(), id:obtainDoc.id}
          const updatedDoc = {...descomprimedDoc,stock: Number(descomprimedDoc.stock)+Number(product.amount)}
          await putFirestore(selected,(updatedDoc))
        })
      );
      response = { success: 'Prodcutos actualizados correctamente ' };
    } catch (error) {
      response = { error: error.message };
    }
    return response;
}
export const cancelSale = async (userProfile, data, id) => {
    let response = {error : 'La venta no ha sido cancelada'}
    try{
      await deleteSale(userProfile, id)
      // elimina venta de la base de datos
      await putProductsStock(userProfile, data)
      // restablece el stock de los productos de la venta eliminada
      response = { success: 'La venta fue cancelada'};
    }catch(error) {
      response = { error: error.message };
    }
    return response
}
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// endpoint customers
//////////////////////////////////////////////////////////////////////////////
export const getCustomers = async (userProfile, setState, loadingOff=()=>{return(null)}) => {
    let response = { error: 'The clients was not geted' };
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/customers`);
      const querySnapshot = await getDocs(selectedCollection);
      const clientsData = querySnapshot.docs.map((client) => ({
        ...client.data(),
        id: client.id,
      }));
      setState(clientsData);
      response = { success: 'Clients retrieved successfully', clientsData };
      setTimeout(loadingOff, 500)
    } catch (error) {
      response = { error: error.message };
    }
    return response
};

export const getClient = async(userProfile,id,setState)=>{
    let response = { error: 'The client was not geted' };
    try{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/customers", id)
        const docSnapshot = await getDoc(selectedDoc)
        if (docSnapshot.exists()) {
            const clientData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(clientData);
            response = { success: 'Client retrieved successfully', clientData };
        } else {
            response = { error: 'Client not found' };
        }
    }catch (error) {
        response = { error: error.message };
    }
    return response
}

export const putClient= async(userProfile, id, data)=>{
    let response = { error: 'El cliente no fue actualizado' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/customers", id)
        await putFirestore(selected,data)
        response = { success: 'Cliente actualizado correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
  
export const deleteClient = async (userProfile, id)=>{
    let response = { error: 'El cliene no fue eliminado' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/customers", id)
        await deleteFirestore(selected)
        response = { success: 'Cliente eliminado correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const postClient = async (userProfile, data) => {
    let response = { error: 'El cliente no fue creado'};
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/customers`);
      await postFirestore(selectedCollection, data);
      response = { success:'Cliente añadido correctamente'};
    } catch (error) {
        response = { error: error.message };
    }
    return response
};
//////////////////////////////////////////////////////////////////////////////

export const getProducts = async (userProfile, setState, loadingOff=()=>{return(null)}) => {
    let response = { error: 'The products was not geted' };
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/products`);
      const querySnapshot = await getDocs(selectedCollection);
      const productsData = querySnapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setState(productsData);
      response = { success: 'Products retrieved successfully', productsData };
      setTimeout(loadingOff, 500)
    } catch (error) {
      response = { error: error.message };
    }
    return response
};
export const getCategories = async (userProfile, setState) => {
    let response = { error: 'The labels was not geted' };
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/categories`);
      const querySnapshot = await getDocs(selectedCollection);
      const categoriesData = querySnapshot.docs.map((category) => ({
        ...category.data(),
        id: category.id,
      }));
      setState(categoriesData);
      response = { success: 'Labels retrieved successfully', categoriesData };
    } catch (error) {
        response = { error: error.message };
    }
    return response
};
export const postAccessProfile = async (userProfile, data)=>{
    let response = { error: 'el perfil de acceso no ha sido creado' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/profilesForUsers")
        await postFirestore(selectedCollection,data)
        response = { success: 'Perfil de acceso creado correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
export const putAccessProfile = async (userProfile, id, data)=>{
    let response = { error: 'El perfil de acceso no fue actualizado' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/profilesForUsers", id)
        await putFirestore(selected,data)
        response = { success: 'Perfil de acceso Actualizada correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
export const deleteAccessProfile = async(userProfile, id)=>{
    let response = { error: 'El perfil no fue eliminado' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/profilesForUsers", id)
        await deleteFirestore(selected)
        response = { success: 'El perfil fue eliminado' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
export const getAccessProfiles = async (userProfile, setState)=>{
    let response = { error: 'The access profiles was not geted' };
    try {
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/profilesForUsers")
        const querySnapshot = await getDocs(selectedCollection);
        const accessProfiles = querySnapshot.docs.map((profile) => ({
            ...profile.data(),
            id: profile.id,
        }));
        setState(accessProfiles);
        response = { success: 'Access profiles retrieved successfully', accessProfiles };
    } catch (error) {
        response = { error: error.message };
    }
    return response
}
export const postLinkAccesProfile = async (userProfile, data, userCode)=>{
    let response = { error: 'No fue posible vincular el profile' };
    try{
        const selectedDoc= doc(getFirestore(), "users/"+userCode)
        const userExist = await getDoc(selectedDoc)
        if(!userExist._document){
            return  { error: 'Usuario no encontrado' };
        }
        const selectedCollection = collection(getFirestore(), "users/"+userCode+"/myProfiles")
        await postFirestore(selectedCollection,{...data, idProfile:data.id})
        putAccessProfile(userProfile, data.id, {...data, usersLinked:[...data.usersLinked, {userCode:userCode, identifier:userExist.data().identifier}]})
        response = { success: 'Perfil de acceso vinculado a usuario '+userCode };
    }catch(error) {
        response = { error: error.message };
    }
    return response
}

export const putLinkAccesProfile = async (userProfile, data, userCode)=>{
    let response = { error: 'No fue posible actualizar el profile' };
    try{ 
        const selectedCollection = collection(getFirestore(), `users/${userCode}/myProfiles`);
        const querySnapshot= await getDocs(query(selectedCollection, where("idProfile", "==", data.id )));
        const selected = doc(getFirestore(), "users/"+userProfile+"/myProfiles/"+querySnapshot.docs[0].id);
        await putFirestore(selected,data)
        response = { success: 'Perfil de acceso Actualizado correctamente' };
    }catch(error) {
        response = { error: error.message };
    }
    return response
}

export const deleteLinkAccesProfile = async (userProfile, data, userCode)=>{
    let response = { error: 'No fue posible eliminar el vinculo' };
    try{ 
        const selectedCollection = collection(getFirestore(), `users/${userCode}/myProfiles`);
        const querySnapshot= await getDocs(query(selectedCollection, where("idProfile", "==", data.id )));
        const selected = doc(getFirestore(), "users/"+userCode+"/myProfiles/"+querySnapshot.docs[0].id)
        await deleteFirestore(selected)
        putAccessProfile(userProfile, data.id, data)
        response = { success: 'Vinculo eliminado correctamente' };
    }catch(error) {
        response = { error: error.message };
    }
    return response
}

export const getCategory = async(userProfile,id,setState)=>{
    let response = { error: 'The label was not geted' };
    try{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/categories", id)
        const docSnapshot = await getDoc(selectedDoc).then(res => setState({...res.data(), id:res.id}))
        if (docSnapshot.exists()) {
            const labelData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(labelData);
            response = { success: 'Label retrieved successfully', labelData };
        } else {
            response = { error: 'Label not found' };
        }
    }catch (error) {
        response = { error: error.message };
    }
    return response
}

export const postCategory = async(userProfile, data)=>{
    let response = { error: 'La etiqueta no ha sido creada' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/categories")
        await postFirestore(selectedCollection,data)
        response = { success: 'Etiqueta creada correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const putCategory= async(userProfile, id, data)=>{
    let response = { error: 'La etiqueta no fue actualizada' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/categories", id)
        await putFirestore(selected,data)
        response = { success: 'Etiquteta Actualizada correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const deleteCategory = async(userProfile, id)=>{
    let response = { error: 'La etiqueta no fue eliminada' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/categories", id)
        await deleteFirestore(selected)
        response = { success: 'Etiqueta eliminada' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const getProduct = async(userProfile,id,setState)=>{
    let response = { error: 'The product was not geted' };
    try{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/products", id)
        const docSnapshot = await getDoc(selectedDoc).then(res => setState({...res.data(), id:res.id}))
        if (docSnapshot.exists()) {
            const productData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(productData);
            response = { success: 'Product retrieved successfully', productData };
        } else {
            response = { error: 'Product not found' };
        }
    }catch (error) {
        response = { error: error.message };
    }
    return response
}

export const deleteProduct = async(userProfile, id)=>{
    let response = { error: 'El rpoducto no fue elimiando' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/products", id)
        await deleteFirestore(selected)
        response = { success: 'Producto eliminado correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}


export const putProduct= async(userProfile, id, data)=>{
    let response = { error: 'El producto no fue actualizado' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/products", id)
        await putFirestore(selected,data)
        response = { success: 'Producto actualizado correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const postProduct = async(userProfile, data)=>{
    let response = { error: 'El producto no fue creado'};
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/products")
        await postFirestore(selectedCollection,data)
        response = { success: 'Producto creado correctamnete' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const putProducts = async (userProfile, data) => {
    let response = { error: 'Los Productos no fueron actualizados' };
    try {
      await Promise.all(
        data.map(async (product) => {
          const selected = doc(getFirestore(), `users/${userProfile}/products`, product.id);
          await putFirestore(selected, product);
        })
      );
      response = { success: 'Productos actualizados correctamente' };
    } catch (error) {
      response = { error: error.message };
    }
    return response;
};

export const postSale = async (userProfile, data)=>{
    let response = { error: 'No se ha podido generar la venta' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/sales")
        await postFirestore(selectedCollection,data)
        response = { success: 'Venta registrada correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

///////////////////////////////////////////////////////////////////
export const getBuys =  async (setState,userProfile,loadingOff=()=>{return(null)})=>{
    let response = { error: 'The buys was not geted' };
    try {
        const selectedCollection = collection(getFirestore(), `users/${userProfile}/buys`);
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("createdDate",'desc')));
        const salesData = querySnapshot.docs.map((sale) => ({
          ...sale.data(),
          id: sale.id,
        }));
        setState(salesData);
        response = { success: 'Buys retrieved successfully', salesData };
        setTimeout(loadingOff, 500)
    } catch (error) {
        response = { error: error.message };
    }
    return response
}

const deleteBuy = async (userProfile, id)=>{

    let response = { error: 'La compra no ha sido eliminada' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/buys", id)
        await deleteFirestore(selected)
        response = { success: 'Compra eliminada correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
const putProductsStockBuyCancel = async (userProfile, data)=>{
    //cancel buy
    // restablece el stock de los productos 
    let response = { error: 'Los productos no han sido actualizados' };
    try {
      await Promise.all(
        data.map(async (product) => {
          const selected = doc(getFirestore(), `users/${userProfile}/products`, product.id);
          const obtainDoc = await getDoc(selected)
          const descomprimedDoc = {...obtainDoc.data(), id:obtainDoc.id}
          const updatedDoc = {...descomprimedDoc,stock: Number(descomprimedDoc.stock)-Number(product.amount)}
          await putFirestore(selected,(updatedDoc))
        })
      );
      response = { success: 'Productos actualizados correctamente' };
    } catch (error) {
      response = { error: error.message };
    }
    return response;
}

export const cancelBuy = async (userProfile, data, id) => {
    let response = {error : 'La venta no ha sido cancelada'}
    try{
      await deleteBuy(userProfile, id)
      // elimina venta de la base de datos
      await putProductsStockBuyCancel(userProfile, data)
      // restablece el stock de los productos de la venta eliminada
      response = { success: 'Venta cancelada correctamente'};
    }catch(error) {
      response = { error: error.message };
    }
    return response
}

export const getBuy= async (userProfile,id,setState)=>{
    let response = { error: 'The buy was not geted' };
    try{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/buys", id)
        const docSnapshot = await getDoc(selectedDoc)
        if (docSnapshot.exists()) {
            const salesData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(salesData);
            response = { success: 'Buys retrieved successfully', salesData };
        } else {
            response = { error: 'Buys not found' };
        }
    }catch (error) {
        response = { error: error.message };
    }
    return response
}

// endpoint providers
//////////////////////////////////////////////////////////////////////////////
export const getProviders = async (userProfile, setState, loadingOff=()=>{return(null)}) => {
    let response = { error: 'The providers was not geted' };
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/providers`);
      const querySnapshot = await getDocs(selectedCollection);
      const clientsData = querySnapshot.docs.map((client) => ({
        ...client.data(),
        id: client.id,
      }));
      setState(clientsData);
      response = { success: 'Providers retrieved successfully', clientsData };
      setTimeout(loadingOff, 500)
    } catch (error) {
      response = { error: error.message };
    }
    return response
};

export const putProvider= async(userProfile, id, data)=>{
    let response = { error: 'El provedor no fue actualizado' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/providers", id)
        await putFirestore(selected,data)
        response = { success: 'Provedor actualizado correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const getProvider = async(userProfile,id,setState)=>{
    let response = { error: 'The provider was not geted' };
    try{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/providers", id)
        const docSnapshot = await getDoc(selectedDoc)
        if (docSnapshot.exists()) {
            const providerData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(providerData);
            response = { success: 'Provider retrieved successfully', providerData };
        } else {
            response = { error: 'Provider not found' };
        }
    }catch (error) {
        response = { error: error.message };
    }
    return response
}

export const deleteProvider = async (userProfile, id)=>{
    let response = { error: 'El provedor no ha sido eliminado' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/providers", id)
        await deleteFirestore(selected)
        response = { success: 'Provedor eliminado correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const postProvider = async (userProfile, data) => {
    let response = { error: 'El provedor no ha sido creado'};
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/providers`);
      await postFirestore(selectedCollection, data);
      response = { success:'Provedor creado correctamente'};
    } catch (error) {
        response = { error: error.message };
    }
    return response
};

export const postBuy = async (userProfile, data)=>{
    let response = { error: 'La compra no fue registrada' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/buys")
        await postFirestore(selectedCollection,data)
        response = { success: 'Compra registrada correctamente' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}