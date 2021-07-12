import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncDeleteBill, asyncGetBills } from '../../actions/billsAction'

const BillsList = (props) => {
    const [ billsList, setBillsList ]  = useState([])

    const bills = useSelector((state) => {
        return state.bills
    })
    
    const customers = useSelector((state) => {
        return state.customers
    })
    //console.log(customers)

    const products = useSelector((state) => {
        return state.products
    })

    //console.log(billsList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetBills())
    }, [])

    useEffect(() => {
        const res = bills.map((ele) => {
            const result = customers.find((cus) => {
                return ele.customer === cus._id
            })
        return {...ele, ...{customerName : result.name}}
        })
        setBillsList(res)
    }, [bills])

    

    const handleRemove = (id) => {
        dispatch(asyncDeleteBill(id))
    }

    return(
        <div>
            <h2>Total bills - {billsList.length}</h2>
            <button><Link to="/bills/billingform" style={{textDecoration:"none", color:"blue"}}>Create a bill</Link></button><br/><br/>
            <div>
                {billsList.length > 0 &&
                <table border="1px solid black">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Total</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billsList.map((ele) => {
                            return (
                                <tr key={ele._id}>
                                    <td>{new Date(ele.date).toISOString().split('T')[0]}</td>
                                    <td>{ele.customerName}</td>
                                    <td>{ele.total}</td>
                                    <td>
                                        <button>Generate</button>
                                        <button onClick={() => {handleRemove(ele._id)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                }
            </div>
        </div>
    )
}

export default BillsList
