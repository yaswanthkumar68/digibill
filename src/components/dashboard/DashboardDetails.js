import React from 'react'
import { useSelector } from 'react-redux'
import { totalIncome } from '../../selectors/dashboard'
import CardDetails from './CardDetails'


const DashboardDetails = (props) => {

    const bills = useSelector(state => state.bills)
    const customers = useSelector(state => state.customers)
    const products = useSelector(state => state.products)

    return (
        <div className="d-flex justify-content-between my-4">
            <CardDetails itemName='Clients' data={customers.length} icon={<i className="fas fa-users text-primary icon"></i>} />
            <CardDetails itemName='Products' data={products.length} icon={<i className="fas fa-boxes text-danger icon"></i>} />
            <CardDetails itemName='Invoices' data={bills.length} icon={<i className="fas fa-file-invoice text-info icon"></i>}/>
            <CardDetails itemName='Income' data={totalIncome(bills)} icon={<i className="fas fa-rupee-sign text-success icon"></i>}/>
        </div>
    )
}

export default DashboardDetails