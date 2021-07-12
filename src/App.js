import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from './actions/statusAction'
import Routings from './components/Routings'

// import './App.css'

const App = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(setLogin())
        }
    }, [])


    return(
        <div className="app-container">
            <Routings />
        </div>
    )
}

export default App