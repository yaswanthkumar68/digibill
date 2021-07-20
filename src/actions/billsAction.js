import axios from '../config/axiosConfig'

export const asyncGetBills = () => {
    return((dispatch) => {
        axios.get('/api/bills')
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
                //console.log(error)
            })
    })
}

export const getBills = (result) => {

    return {
        type : 'GET_BILLS',
        payload : result
    }
}

export const asyncCreateBill = (details, statusSet) => {

    return((dispatch) => {
        axios.post('/api/bills', details)
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.errors.message)                 
                }
                else{
                    dispatch(createBill(result))
                    statusSet()
                }
            })
            .catch((error) => {
                alert(error.message)
                //console.log(error)
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
        axios.delete(`/api/bills/${id}`)
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

