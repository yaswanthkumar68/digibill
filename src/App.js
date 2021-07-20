import React, { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { setLogin } from './actions/statusAction'
import Routings from './components/Routes/Routings'
import { asyncGetCustomers} from './actions/customersAction'
import { asyncGetProducts } from './actions/productsAction'
import { asyncGetBills } from './actions/billsAction'
import 'bootstrap/dist/css/bootstrap.min.css'



import './App.css'

const App = (props) => {
    const status = useSelector((state) => {
        return state.status
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(setLogin())
            dispatch(asyncGetCustomers())
            dispatch(asyncGetProducts())
            dispatch(asyncGetBills())
        }
    }, [status.logInStatus])


    return(
        <div className=" container-fluid app-container">
            <Routings />
        </div>
    )
}

export default App