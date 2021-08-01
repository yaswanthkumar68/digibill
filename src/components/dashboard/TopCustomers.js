import React from 'react'
import { useSelector } from 'react-redux'
import { getCustomersAmount , getTopCustomers} from '../../selectors/dashboard'
//import './dashBoard.css'

const TopCustomers = () => {
    const customers = useSelector(state => state.customers)
    const bills = useSelector(state => state.bills)

    const groupedCustomersData = getCustomersAmount(customers, bills)
    const sortedTopCustomers = getTopCustomers(groupedCustomersData)

    //console.log(sortedTopCustomers)
  
    return(
        <>
            {customers.length && bills.length ?
                <div className="col-7 mt-2 dashboard-table animate__animated animate__zoomIn" style={{backgroundColor:"whitesmoke",borderRadius:"10px"}}>
                    <h2 className="text-center my-2">Top customers</h2>
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Name of customer</th>
                                <th>Mobile number</th>
                                <th>Total amount spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTopCustomers.map((ele, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.mobile}</td>
                                        <td>Rs.{ele.amount}/-</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div> : null
            } 
        </>
    )
}

export default TopCustomers