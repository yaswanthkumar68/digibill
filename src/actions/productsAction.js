import axios from '../config/axiosConfig'

export const asyncGetProducts = () => {

    return((dispatch) => {
        axios.get('/api/products')
        .then((response) => {
            const result = response.data
            dispatch(getProducts(result))
        })
        .catch((error) => {
            //console.log(error.message)
            alert(error.message)
        })
    })
}

export const getProducts = (result) => {

    return {
        type : 'GET_PRODUCTS',
        payload : result

    }
}

export const asyncCreateProduct = (values) => {

    return((dispatch) => {
        axios.post('/api/products', values)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors.message)
            }
            else{
                //console.log(result)
                dispatch(createProduct(result))
            }
        })
        .catch((error) => {
            alert(error.message)
        })
    })
}

export const createProduct = (result) => {

    return {
        type : "CREATE_PRODUCT",
        payload : result
    }
}

export const asyncEditProduct = (id, details) => {

    return((dispatch) => {
        axios.put(`/api/products/${id}`, details)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors.message)
            }
            else{
                dispatch(editProduct(result))
            }
        })
        .catch((error) => {
            alert(error.message)
        })
    })
}

export const editProduct = (result) => {
    return {
        type : "EDIT_PRODUCT",
        payload : result
    }
}


export const asyncRemoveProduct = (id) => {

    return((dispatch) => {
        axios.delete(`/api/products/${id}`) 
        .then((response) => {
            const result = response.data
            dispatch(removeProduct(result))
            
        })
        .catch((error) => {
            alert(error.message)
        })
    })
}

export const removeProduct = (result) => {
    return{
        type : 'REMOVE_PRODUCT',
        payload : result
    }
}