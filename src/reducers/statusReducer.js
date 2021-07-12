const initialStateStatus = { registerStatus : false, logInStatus : false, account : {}}

const statusReducer = (state = initialStateStatus, action) => {
    switch (action.type) {
        case 'REGISTER_STATUS' : {
            return {...state, registerStatus: true}
        }
        case 'RESET_REGISTER_STATUS' : {
            return {...state, registerStatus: false}
        }
        case 'LOGIN_STATUS' : {
            return {...state, logInStatus: true}
        }
        case 'RESET_LOGIN_STATUS' : {
            return {...state, logInStatus: false}
        }
        case 'GET_ACCOUNT' : {
            return {...state, account:{...action.payload}}
        }
        default : {
            return {...state}
        }
    }
}

export default statusReducer