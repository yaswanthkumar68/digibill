const productsInitialSet = []

const productsReducer = (state = productsInitialSet, action) => {
    switch (action.type)  {
        case 'GET_PRODUCTS' : {
            return [...action.payload]
        }

        case 'CREATE_PRODUCT' : {
            return [...state, {...action.payload}]
        }

        case 'EDIT_PRODUCT' : {
            return state.map((ele) => {
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }
                else{
                    return ele
                }
            })
        }
        
        case 'REMOVE_PRODUCT' : {
            return state.filter((ele) => {
                return ele._id !== action.payload._id
            })
        }
        
        default : {
            return [...state]
        }
    }
}

export default productsReducer