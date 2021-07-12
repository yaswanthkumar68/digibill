import { createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import statusReducer from "../reducers/statusReducer"
import productsReducer from "../reducers/productsReducer"
import customersReducer from "../reducers/customersReducers"
import billsReducer from "../reducers/billsReducer"


const configureStore = () => {
    const store = createStore(combineReducers({
        status : statusReducer,
        products : productsReducer,
        customers : customersReducer,
        bills: billsReducer
    
    }), applyMiddleware(thunk))

    return store
}

export default configureStore