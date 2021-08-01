import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncDeleteBill} from '../../actions/billsAction'
import { getName } from '../../selectors/bills'
import Swal from 'sweetalert2'
import { swal } from '../../selectors/alerts'

const BillsList = (props) => {
        
    const customers = useSelector((state) => {
        return state.customers
    })
    //console.log(customers)

    const bills = useSelector((state) => {
        return state.bills
    })

    const listBills = [...bills]
    //console.log(billsList)
    const dispatch = useDispatch()
    const handleRemove = (id) => {
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
                dispatch(asyncDeleteBill(id))
                swal('Bill is deleted sucessfully')
            }
          })  
       
    }

    return(
        <div style={{marginLeft:"1.5em"}}>
            <div className="row my-4 justify-content-around align-items-center">
                <h3 className="col-3 my-1" style={{color:"crimson"}}>Total bills - {bills.length}</h3>
                <button className="col-2 btn btn-success btn-lg"><Link to="/bills/billingform" style={{textDecoration:"none", color:"white"}}>Create new bill</Link></button>
            </div>

            <div style={{overflow:"auto", height:"80vh"}}>
            <div className="row justify-content-center">
                {bills.length && customers.length ?
                <table className="table table-hover w-75 text-center" style={{fontSize:"20px"}}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Total</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBills.reverse().map((ele) => {
                            return (
                                <tr key={ele._id}>
                                    <td>{new Date(ele.date).toISOString().split('T')[0]}</td>
                                    <td>{getName(ele.customer, customers).name}</td>
                                    <td>Rs. {ele.total}/-</td>
                                    <td>
                                        <button style={{border:'none', backgroundColor:"#EBEBF3"}}><Link to={{pathname:`/bills/${ele._id}`, state:ele}}><i className="fas fa-file-invoice mx-2" style={{color:"blue", fontSize:"20px", backgroundColor:"#EBEBF3"}}></i></Link></button>
                                        <button style={{border:'none', backgroundColor:"#EBEBF3"}} onClick={() => {handleRemove(ele._id)}}><i className="far fa-trash-alt mx-2" style={{color:"red", fontSize:"20px", backgroundColor:"#EBEBF3"}}></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : null
                }
            </div>
            </div>
        </div>
    )
}

export default BillsList
