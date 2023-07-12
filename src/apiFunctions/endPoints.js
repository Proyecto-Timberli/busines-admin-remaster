import { getFirestore, doc , getDoc, collection, getDocs } from 'firebase/firestore';
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
    let response = { error: 'The business was not updated'};
    try {
      const selected = doc(getFirestore(), `users/${userProfile}`);
      await postFirestoreId(selected, data);
      response = { success:'Bussines data update successfully'};
    } catch (error) {
        response = { error: error.message };
    }
    return response
} 


// endpoint sales
//////////////////////////////////////////////////////////////////////////////
export const getSales =  async (setState,userProfile)=>{
    let response = { error: 'The sales was not geted' };
    try {
        const selectedCollection = collection(getFirestore(), `users/${userProfile}/sales`);
        const querySnapshot = await getDocs(selectedCollection);
        const salesData = querySnapshot.docs.map((sale) => ({
          ...sale.data(),
          id: sale.id,
        }));
        setState(salesData);
        response = { success: 'Sales retrieved successfully', salesData };
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
    let response = { error: 'The sales was not deleted' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/sales", id)
        await deleteFirestore(selected)
        response = { success: 'Sales deleted successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
const putProductsStock = async (userProfile, data)=>{
    //cancel sale
    // restablece el stock de los productos 
    let response = { error: 'The products were not updated' };
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
      response = { success: 'Products updated successfully' };
    } catch (error) {
      response = { error: error.message };
    }
    return response;
}
export const cancelSale = async (userProfile, data, id) => {
    let response = {error : 'The sale could not be canceled'}
    try{
      await deleteSale(userProfile, id)
      // elimina venta de la base de datos
      await putProductsStock(userProfile, data)
      // restablece el stock de los productos de la venta eliminada
      response = { success: 'The sale was canceled'};
    }catch(error) {
      response = { error: error.message };
    }
    return response
}
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


// endpoint customers
//////////////////////////////////////////////////////////////////////////////
export const getCustomers = async (userProfile, setState) => {
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
    let response = { error: 'The client was not updated' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/customers", id)
        await putFirestore(selected,data)
        response = { success: 'Client updated successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
  

export const deleteClient = async (userProfile, id)=>{
    let response = { error: 'The client was not deleted' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/customers", id)
        await deleteFirestore(selected)
        response = { success: 'Client deleted successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const postClient = async (userProfile, data) => {
    let response = { error: 'The client was not created'};
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/customers`);
      await postFirestore(selectedCollection, data);
      response = { success:'Client added successfully'};
    } catch (error) {
        response = { error: error.message };
    }
    return response
  };
//////////////////////////////////////////////////////////////////////////////

export const getProducts = async (userProfile, setState) => {
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
    let response = { error: 'The label was not created' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/categories")
        await postFirestore(selectedCollection,data)
        response = { success: 'Label created successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const putCategory= async(userProfile, id, data)=>{
    let response = { error: 'The label was not updated' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/categories", id)
        await putFirestore(selected,data)
        response = { success: 'Label updated successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const deleteCategory = async(userProfile, id)=>{
    let response = { error: 'The label was not deleted' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/categories", id)
        await deleteFirestore(selected)
        response = { success: 'Label deleted successfully' };
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
    let response = { error: 'The product was not deleted' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/products", id)
        await deleteFirestore(selected)
        response = { success: 'Product deleted successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}


export const putProduct= async(userProfile, id, data)=>{
    let response = { error: 'The product was not updated' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/products", id)
        await putFirestore(selected,data)
        response = { success: 'Product updated successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const postProduct = async(userProfile, data)=>{
    let response = { error: 'The product was not created' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/products")
        await postFirestore(selectedCollection,data)
        response = { success: 'Product created successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const putProducts = async (userProfile, data) => {
    let response = { error: 'The products were not updated' };
    try {
      await Promise.all(
        data.map(async (product) => {
          const selected = doc(getFirestore(), `users/${userProfile}/products`, product.id);
          await putFirestore(selected, product);
        })
      );
      response = { success: 'Products updated successfully' };
    } catch (error) {
      response = { error: error.message };
    }
    return response;
};


export const postSale = async (userProfile, data)=>{
    let response = { error: 'The sale was not registered' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/sales")
        await postFirestore(selectedCollection,data)
        response = { success: 'Sale registered successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

///////////////////////////////////////////////////////////////////

export const getBuys =  async (setState,userProfile)=>{
    let response = { error: 'The buys was not geted' };
    try {
        const selectedCollection = collection(getFirestore(), `users/${userProfile}/buys`);
        const querySnapshot = await getDocs(selectedCollection);
        const salesData = querySnapshot.docs.map((sale) => ({
          ...sale.data(),
          id: sale.id,
        }));
        setState(salesData);
        response = { success: 'Buys retrieved successfully', salesData };
    } catch (error) {
        response = { error: error.message };
    }
    return response
}

const deleteBuy = async (userProfile, id)=>{

    let response = { error: 'The buys was not deleted' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/buys", id)
        await deleteFirestore(selected)
        response = { success: 'Buys deleted successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
const putProductsStockBuyCancel = async (userProfile, data)=>{
    //cancel buy
    // restablece el stock de los productos 
    let response = { error: 'The products were not updated' };
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
      response = { success: 'Products updated successfully' };
    } catch (error) {
      response = { error: error.message };
    }
    return response;
}

export const cancelBuy = async (userProfile, data, id) => {
    let response = {error : 'The buy could not be canceled'}
    try{
      await deleteBuy(userProfile, id)
      // elimina venta de la base de datos
      await putProductsStockBuyCancel(userProfile, data)
      // restablece el stock de los productos de la venta eliminada
      response = { success: 'The buy was canceled'};
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
export const getProviders = async (userProfile, setState) => {
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
    } catch (error) {
      response = { error: error.message };
    }
    return response
};

export const putProvider= async(userProfile, id, data)=>{
    let response = { error: 'The provier was not updated' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/providers", id)
        await putFirestore(selected,data)
        response = { success: 'Provider updated successfully' };
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
    let response = { error: 'The provider was not deleted' };
    try{
        const selected = doc(getFirestore(), "users/"+userProfile+"/providers", id)
        await deleteFirestore(selected)
        response = { success: 'Provider deleted successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}

export const postProvider = async (userProfile, data) => {
    let response = { error: 'The provider was not created'};
    try {
      const selectedCollection = collection(getFirestore(), `users/${userProfile}/providers`);
      await postFirestore(selectedCollection, data);
      response = { success:'Provider added successfully'};
    } catch (error) {
        response = { error: error.message };
    }
    return response
  };

export const postBuy = async (userProfile, data)=>{
    let response = { error: 'The buy was not registered' };
    try{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/buys")
        await postFirestore(selectedCollection,data)
        response = { success: 'Buy registered successfully' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}