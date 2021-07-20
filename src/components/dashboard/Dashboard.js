import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BillsData from './BillsData'
import DashboardDetails from './DashboardDetails'
import LastInvoices from './LastInvoices'
import TopCustomers from './TopCustomers'
import TopProducts from './TopProducts'

const Dashboard = (props) => {
    const status = useSelector((state) => {
        return state.status
    })

    return(
        <div style={{margin:"1.5em"}}>
            <div className="row mb-3">
                <h2 className="col-10">hey! {status.account.username}....</h2>
                <button className="col-2" style={{backgroundColor:"#5E8DCA", borderRadius:"5px", border:"none"}}><Link to="/bills/billingform" style={{textDecoration:"none", color:"white", fontSize:"20px"}}>Create new bill</Link></button>
            </div>
            <DashboardDetails /> 
            <div className="d-flex justify-content-between my-5">
                <BillsData />
                <LastInvoices  />
            </div>
            <div className="d-flex justify-content-between my-3">
                <TopCustomers />
                <TopProducts />
            </div>
            
            
        </div>
    )
}

export default Dashboard