const customersInitialState = []

const customersReducer = (state = customersInitialState, action) => {
    switch (action.type) {

        case 'GET_CUSTOMERS' : {
            return [...action.payload]
        }
        case 'CREATE_CUSTOMER' : {
            return [...state, {...action.payload}]
        }
        case 'EDIT_CUSTOMER' : {
            return state.map((ele) => {
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }
                else{
                    return ele
                }
            })
        }
        case 'REMOVE_CUSTOMER' : {
            return state.filter((ele) => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}

export default customersReducer