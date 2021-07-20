import React, { useEffect } from'react'
import { Link, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Register from '../authentication/Register'
import Login from '../authentication/Login'
import Dashboard from '../dashboard/Dashboard'
import Products from '../products/Products'
import Customers from '../customers/Customers'
import CustomerInfo from '../customers/CustomerInfo'
import Account from '../Account'
import BillsList from '../billing/BillsList'
import BillingForm from '../billing/BillingForm'
import BillInfo from '../billing/BillInfo'

import './routing.css'

import { asyncGetAccount, resetLogin } from '../../actions/statusAction'


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
        <div className="container-fluid">
            <>
                {status.logInStatus &&
                <div className="d-flex justify-content-sm-between align-items-sm-center px-5 py-2" style={{borderBottom:"2px solid #ddd", backgroundColor:"#b7b9f7"}}>
                    <div>
                        <h1 style={{color:"white"}}><span style={{fontSize:"55px"}}>D</span>igi<span style={{fontSize:"55px"}}>B</span>ill</h1>
                    </div>
                    <div>
                        <Link to='/account' className="px-3 link"><i className="fas fa-user"></i> {status.account.username}</Link>
                        <Link to='/' className=" px-3 link"  onClick={()=>{
                            localStorage.removeItem('token')
                            dispatch(resetLogin())
                        }}>Logout</Link>
                    </div>
                    
                </div>
                }
            </>
            <div className='row mx-auto'>
                {status.logInStatus && 
                    <div className="col-md-2" style={{backgroundColor:"#b7b9f7",borderRight:"2px solid #ddd", minHeight:"100vh", height:"auto"}}>
                        <div className="nav flex-column text-center my-2">
                            <Link to='/dashboard' className="px-2 py-3 link">Dashboard</Link>
                            <Link to='/products' className="px-2 py-3 link">Products</Link>
                            <Link to='/customers' className="px-2 py-3 link">Customers</Link>
                            <Link to='/bills' className="px-2 py-3 link">Bills</Link>
                        </div>
                    </div>
                }
                
                <div className='col-md-10' style={{backgroundColor:"#EBEBF3"}}>
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/products" component={Products} />
                    <PrivateRoute path="/customers" component={Customers} exact={true} />
                    <PrivateRoute path="/customers/:id" component={CustomerInfo} />
                    <PrivateRoute path="/account" component={Account} />
                    <PrivateRoute path="/bills" component={BillsList} exact={true} />
                    <PrivateRoute path="/bills/:id" component={BillInfo} />
                    <PrivateRoute path="/bills/billingform" component={BillingForm} />
                </div>
            </div>

            <PublicRoute restricted={true} path="/" component={Login} exact={true} />
            <PublicRoute restricted={true} path="/register" component={Register} />
            
        </div>
    )

}
const wrappedComponent = withRouter(Routings)
export default wrappedComponent

