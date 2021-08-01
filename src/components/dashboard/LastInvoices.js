import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLastInvoices } from '../../selectors/dashboard'
import { getName } from '../../selectors/bills'


const LastInvoices = (props) => {
    const customers = useSelector(state => state.customers)
    const bills = useSelector(state => state.bills)
    const lastInvoices = getLastInvoices(bills)

    return(
        <>
            {bills.length && customers.length ?
                <div className=" col-3 animate__animated animate__zoomIn listBills">
                    <div className="d-flex justify-content-between align-items-center listbills-heading ">
                        <h4>Last invoices</h4>
                        <h5><Link to="/bills" style={{textDecoration:"none"}}>view all</Link></h5>
                    </div>
                    {customers.length &&
                        <div>
                            <ol>
                                {lastInvoices.map((ele) =>{
                                    return(
                                        <li key={ele._id} className="list">{getName(ele.customer, customers).name} - Rs.{ele.total}/-</li>
                                    )
                                })}
                            </ol>
                        </div>
                    }
                
                </div> : null
            }
        </>
    )
}

export default LastInvoices