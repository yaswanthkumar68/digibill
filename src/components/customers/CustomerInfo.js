import React, { useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncRemoveCustomer } from '../../actions/customersAction'

const CustomerInfo = (props) => {
    const { id } = props.match.params
    const { state } = props.location
    //console.log(id, state)
    const dispatch = useDispatch()

    const handleEdit = () => {
        props.history.push({
            pathname : '/customers',
            state : state,
        })
    }

    const handleDelete = () => {
        dispatch(asyncRemoveCustomer(id))
        props.history.push('/customers')
    }

    return(
            <>
            <h2><Link to="/customers"><i className="fas fa-arrow-circle-left"></i></Link></h2>
            <h1>{state.name}</h1>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>

            <p><i className="fas fa-user" style={{fontSize:"100px"}}></i></p>
            <div>
                <h2>id : {state._id}</h2>
                <h2>name : {state.name}</h2>
                <h2>mobile : {state.mobile}</h2>
                <h2>email : {state.email}</h2>
            </div>
            </>

        
    )
}

export default CustomerInfo