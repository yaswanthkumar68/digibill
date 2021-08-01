import axios from "../config/axiosConfig"

export const asyncRegisterStatus = (values) => {
    
    return((dispatch) => {
        axios.post('/api/users/register', values)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            }
            else{
                alert('your account created successfully')
                dispatch(setRegisterStatus())
            }
        })
        .catch((error) => {
            console.log(error.message)
        })
    })   
}

export const setRegisterStatus = () => {

    return {
        type : "REGISTER_STATUS",
    }
}

export const resetRegisterStatus = () => {
    return {
        type : "RESET_REGISTER_STATUS"
    }
}


export const asyncLoginStatus = (values, handleServerErrors) => {

    return((dispatch) => {
        axios.post('/api/users/login', values)
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    //alert(result.errors)
                    handleServerErrors(result)
                }
                else{
                    alert('sucessfully logged in')
                    localStorage.setItem('token', result.token)
                    window.location.reload()
                    dispatch(setLogin())
                }
            })
            .catch((error) => {
                console.log(error.message)
            })
    })

}

export const setLogin = () => {

    return {
        type : 'LOGIN_STATUS'
    }
}


export const resetLogin = () => {
    return {
        type : 'RESET_LOGIN_STATUS'
    }
}

export const asyncGetAccount = () => {

    return((dispatch) => {
        axios.get('/api/users/account') 
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.errors)
                }
                else{                    
                    dispatch(getAccount(result))
                }
            })
            .catch((error) => {
                console.log(error.message)
            })

    })
}

export const getAccount = (result) => {

    return {
        type : "GET_ACCOUNT",
        payload : result
    }
}