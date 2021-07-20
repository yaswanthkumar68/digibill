import axios from '../config/axiosConfig'

// get all customers
export const asyncGetCustomers = () => {

    return((dispatch) => {
        axios.get('api/customers')
            .then((response) => {
                const result =  response.data
                dispatch(getCustomers(result))
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}

export const getCustomers = (result) => {

    return {
        type : 'GET_CUSTOMERS',
        payload : result
    }
}

// create a customer
export const asyncCreateCustomer = (data) => {

    return((dispatch) => {
        axios.post('/api/customers', data)
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.error.message)
                }
                else{
                    dispatch(createCustomer(result))
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}

export const createCustomer = (result) => {

    return{
        type : 'CREATE_CUSTOMER',
        payload : result
    }
}

// edit a customer

export const asyncEditCustomer = (id, data) => {

    return((dispatch) => {
        axios.put(`/api/customers/${id}`, data)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors.message)
            }
            else{
                dispatch(editCustomer(result))
            }
        })
        .catch((error) => {
            alert(error.message)
        })
    })
}

export const editCustomer = (result) => {

    return{
        type : "EDIT_CUSTOMER",
        payload : result
    }
}

// remove customer

export const asyncRemoveCustomer = (id, redirect) => {

    return((dispatch) => {
        axios.delete(`/api/customers/${id}`) 
        .then((response) => {
            const result = response.data
            dispatch(removeCustomer(result))
            redirect()
        })
        .catch((error) => {
            alert(error.message)
        })
    })
}

export const removeCustomer = (result) => {
    return{
        type : 'REMOVE_CUSTOMER',
        payload : result
    }
}