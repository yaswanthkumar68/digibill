import React, { useEffect } from'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Register from './authentication/Register'
import Login from './authentication/Login'
import Dashboard from './dashboard/Dashboard'
import Products from './products/Products'
import Customers from './customers/Customers'
import CustomerInfo from './customers/CustomerInfo'
import Account from './Account'
import BillsList from './billing/BillsList'
import BillingForm from './billing/BillingForm'

import './routing.css'

import { asyncGetAccount, resetLogin } from '../actions/statusAction'



const Routings = (props) => {

    const status = useSelector((state) => {
        return state.status
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if(status.logInStatus){
            dispatch(asyncGetAccount())
        }
    }, [status.logInStatus])

    return(
        <div>
            <>
                {status.logInStatus &&
                <>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline",flexWrap:"wrap", border:"1px solid black"}}>
                        <h1 style={{margin:"10px 10px"}}>DigiBill</h1>
                        <div>
                            <Link to='/account' className="link"><i className="fas fa-user"></i> {status.account.username}</Link>
                            <Link to='/' className="link"  onClick={()=>{
                                localStorage.removeItem('token')
                                dispatch(resetLogin())
                            }}>Logout</Link>
                        </div>
                    </div>
                </>
                }
            </>
            <div className={status.logInStatus ? 'menubar' : ""}>
                    {status.logInStatus && 
                        <div style={{minWidth:"5em",minHeight:"100vh", height:"auto"}}>
                            <div style={{display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
                                <Link to='/dashboard' className="link">Dashboard</Link>
                                <Link to='/products' className="link">Products</Link>
                                <Link to='/customers' className="link">Customers</Link>
                                <Link to='/bills' className="link">Bills</Link>
                            </div>
                        </div>
                    }
                
                <div style={{margin:"1em"}}>
                    <Route path="/" component={Login} exact={true} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/products" component={Products} />
                    <Route path="/customers" component={Customers} exact={true} />
                    <Route path="/customers/:id" component={CustomerInfo} />
                    <Route path="/account" component={Account} />
                    <Route path="/bills" component={BillsList} exact={true} />
                    <Route path="/bills/billingform" component={BillingForm} />
                </div>
            </div>
            
        </div>
    )

}
const wrappedComponent = withRouter(Routings)
export default wrappedComponent

