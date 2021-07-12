const initialBillsState = []

const billsReducer = (state = initialBillsState, action) => {
    switch (action.type){

        case 'GET_BILLS' : {
            return [...action.payload]
        }

        case 'CREATE_BILL' : {
            return [...state, {...action.payload}]
        }

        case 'DELETE_BILL' : {
            return state.filter((ele) => {
                return ele._id !== action.payload._id
            })
        }

        default : {
            return [...state]
        }
    }
}

export default billsReducer