import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncRemoveCustomer } from '../../actions/customersAction'
import { asyncDeleteBill } from '../../actions/billsAction'
import { swal } from '../../selectors/alerts'
import Swal from 'sweetalert2'

const CustomerInfo = (props) => {
    const { id } = props.match.params
    const { state } = props.location

    const bills = useSelector( state => state.bills)
    const result = bills.filter((ele) => {
        return ele.customer === id
    })
    //console.log(result)

    const dispatch = useDispatch()

    const handleEdit = () => {
        props.history.push({
            pathname : '/customers',
            state : state,
        })
    }
    
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText:'No'
          }).then((result) => {
            if (result.isConfirmed) {
                const redirect = () => {
                    props.history.replace('/customers')
                }
                dispatch(asyncRemoveCustomer(id, redirect))
                
                bills.forEach((ele) => {
                    if(ele.customer === id){
                        dispatch(asyncDeleteBill(ele._id))
                    }
                })
                swal('Customer is deleted successfully')
            }
          })          
    }

    const handleRemove = (id) => {
        dispatch(asyncDeleteBill(id))
    }


    return(
        <div style={{marginLeft:"1.5em"}}>
            <div className="my-3">
                <Link to="/customers" className="col-1"><i className="fas fa-arrow-circle-left" style={{fontSize:"30px"}}></i></Link>
                <div className="row  align-items-center my-4">
                    <h1 className="col-9" style={{color:"crimson"}}>{state.name}</h1>
                    <button className="col-1 mx-2 btn btn-success" onClick={handleEdit}>Edit</button>
                    <button className="col-1 mx-2 btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
                
            </div>

            <div className="row d-flex justify-content-center my-5 ">
                <i className="fas fa-user col-2" style={{fontSize:"100px"}}></i>
                <div className="col-5">
                    <h3>id : {state._id}</h3>
                    <h3>name : {state.name}</h3>
                    <h3>mobile : {state.mobile}</h3>
                    <h3>email : {state.email}</h3>
                </div>
            </div>
            <div className="row justify-content-center">
                {result.length ?
                    <table className="table table-hover w-50 text-center">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((ele, i) => {
                                return (
                                    <tr key={ele._id}>
                                        <td>{i+1}</td>
                                        <td>{new Date(ele.date).toISOString().split('T')[0]}</td>
                                        <td>{ele.total}</td>
                                        <td>
                                            <button style={{border:"none", backgroundColor:"#EBEBF3"}}><Link to={{pathname:`/bills/${ele._id}`, state:ele}}><i class="fas fa-file-invoice mx-2" style={{color:"blue", fontSize:"20px", backgroundColor:"#EBEBF3"}}></i></Link></button>
                                            <button style={{border:"none", backgroundColor:"#EBEBF3"}} onClick={() => {handleRemove(ele._id)}}><i class="far fa-trash-alt mx-2" style={{color:"red", fontSize:"20px", backgroundColor:"#EBEBF3"}}></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table> : null
                }
                {result.length === 0 && <h2>No bills are generated yet</h2>
                }
            </div>
        </div>

        
    )
}

export default CustomerInfo