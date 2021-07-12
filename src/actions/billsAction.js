import axios from 'axios'

export const asyncGetBills = () => {
    return((dispatch) => {
        axios.get(' http://dct-billing-app.herokuapp.com/api/bills', {
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
                    dispatch(getBills(result))
                }
            })
            .catch((error) => {
                alert(error.message)
                console.log(error)
            })
    })
}

export const getBills = (result) => {

    return {
        type : 'GET_BILLS',
        payload : result
    }
}

export const asyncCreateBill = (details) => {

    return((dispatch) => {
        axios.post(' http://dct-billing-app.herokuapp.com/api/bills', details, {
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
                    dispatch(createBill(result))
                }
            })
            .catch((error) => {
                alert(error.message)
                console.log(error)
            })
    })
}

export const createBill = (result) => {
    
    return {
        type : 'CREATE_BILL',
        payload : result
    }
}

export const asyncDeleteBill = (id) => {
    return((dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`, {
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
                    dispatch(deleteBill(result))
                }
            })
            .catch((error) => {
                alert(error.message)
                
            })
    })
}

export const deleteBill = (result) => {

    return {
        type : 'DELETE_BILL',
        payload : result
    }
}

