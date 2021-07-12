import axios from 'axios'

// get all customers
export const asyncGetCustomers = () => {

    return((dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
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
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', data , {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
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
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, data, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
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

export const asyncRemoveCustomer = (id) => {

    return((dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`, {
            headers :{
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        }) 
        .then((response) => {
            const result = response.data
            dispatch(removeCustomer(result))
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