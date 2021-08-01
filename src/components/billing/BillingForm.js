import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Hint } from 'react-autocomplete-hint'
import { asyncCreateBill } from '../../actions/billsAction'
import { getAllMobileNumbers, getProductsName, getProductDetails, getProductAmount } from '../../selectors/bills'
import { swal } from '../../selectors/alerts'


const BillingForm = (props) => {
    const [ customerDetails, setCustomerDetails ] = useState({id:'', name:'', mobile:''})
    const [ productsDetails, setProductDetails ] = useState([{id:'', name:'', price:'', quantity:'', subTotal:''}])
    const [ total, setTotal ] = useState('')
    const [ status, setStatus ] = useState(false)
    
    const date = new Date().toISOString().split('T')[0]

    const dispatch = useDispatch()

    const bills = useSelector((state) => {
        return state.bills
    })
    //console.log(bills)

    useEffect(() => {
        let totalAmount = 0
        productsDetails.forEach((ele) => {
            totalAmount += Number(ele.subTotal)
        })
        //console.log(totalAmount)
        setTotal(totalAmount)
    }, [productsDetails])

    useEffect(() => {
        if(status){
            props.history.push({
                pathname : `/bills/${bills[bills.length-1]._id}`,
                state : bills[bills.length-1]
            })
        }
    }, [bills, status])

    // customer details
    const customers = useSelector((state) => {
        return state.customers
    })

    const handleBlur = () => {
        const customer = customers.find((ele) => {
            return ele.mobile === customerDetails.mobile
        })
        // console.log(customer)
        if(customer){
            const details = {...customerDetails}
            setCustomerDetails({...details, id:customer._id, name:customer.name})
        }
        else{
            alert('customer is not added in list')
            props.history.push('/customers')
        }
    }
    const handleFocus = () => {
            const details = {...customerDetails}
            setCustomerDetails({...details, id:'', name:''})
    }
    
    const handleChange = (e) => {
        const { value } = e.target
        const details = {...customerDetails}
        setCustomerDetails({...details, mobile: value})
    }

    // Products Information
    const products = useSelector((state) => {
        return state.products
    })

    const handleProductChange = (e, index) =>{
        const { name, value } = e.target
        
        const result = productsDetails.map((ele, i) => {
            if(i === index){
                return {...ele, [name]: value}
            }
            else{
                return ele
            }
        })
        setProductDetails(result)
    }

    const handleAdd = () => {
        setProductDetails([...productsDetails, {id:'', name:'', price:'', quantity:'', subTotal:''}])
    }

    const handleRemove = (e,i) => {
        const result = productsDetails.filter((ele,index) => {
            return i !== index
        })

        //console.log(result, 'result')
        setProductDetails(result)
    }
    

    const handleProductBlur = (e, index) => {
        const {name, value} = e.target
    
        if(name === 'name'){
            const res = getProductDetails(value, index, products, productsDetails)
            if(res){
                setProductDetails(res)
            }
            else{
                alert('product item is not found in the list')
            }
        }
        else if(name === 'quantity'){
            const res = getProductAmount(index, productsDetails)
            //console.log('res', res)
            setProductDetails(res)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const lineItems = productsDetails.map((ele) => {
            return {
                product : ele.id,
                quantity : ele.quantity
            }
        })
        //console.log(lineItems)
        const data = {
            date : date,
            customer: customerDetails.id,
            lineItems : lineItems
        }
        const statusSet = () => {
            setStatus(true)
        }
        dispatch(asyncCreateBill(data, statusSet))
        //console.log('clicked')
        setCustomerDetails({id:'', name:'', mobile:''})
        setProductDetails([{id:'', name:'', price:'', quantity:'', subTotal:''}])
        

    }
    // console.log(status)
    return(
        
        <div className="mx-5 py-3" >
            <h2>Billing Form</h2>
            <div className="form-group col-2 my-2">
                <label>Date</label><br/>
                <input type="text" disabled={true} value={date} className="form-control border border-info" /><br/>
            </div>
            
            <div className="row my-2">
                <h3>Customer Details</h3>
                <div className="col-3 form-group">
                    <label>Customer Mobile</label><br/>
                    <Hint options={getAllMobileNumbers(customers)} allowTabFill={true}>
                        <input 
                            className="form-control border border-dark"
                            type="text" 
                            name="mobile" 
                            value={customerDetails.mobile} 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                        />
                    </Hint>
                    
                </div>
                <div className="col-4 form-group">
                    <label>Customer Name</label><br/>
                    <input 
                        className="form-control border border-info"
                        type="text" 
                        name="name" 
                        value={customerDetails.name} 
                        disabled={true} 
                    />
                </div>
            </div>
            <div className="row mt-4">
                <h3>Products Details</h3> 
            </div>
            {productsDetails.map((ele, i) => {
                return(
                    <div key={i} className="row">
                        <div className="col-4 form-group mb-2" >
                            <label>Product Name</label>
                            <Hint options={getProductsName(products)} allowTabFill={true}>
                                <input 
                                    className="form-control border border-dark"
                                    type="text" 
                                    name="name" 
                                    value={ele.name} 
                                    onChange={(e) => {handleProductChange(e, i)}}
                                    onBlur={(e) => {handleProductBlur(e, i)}}
                                
                                />
                            </Hint>
                            
                        </div>
                        <div className="col-3 form-group">
                            <label>Product Quantity</label>
                            <input 
                                className="form-control border border-dark"
                                type="number" 
                                name="quantity" 
                                value={ele.quantity} 
                                onChange={(e) => {handleProductChange(e, i)}}
                                onBlur={(e) => {handleProductBlur(e, i)}}
                        
                            />
                        </div>
                        <div className="col-5 form-group d-flex">
                            <div>
                                <label>Sub Total</label>
                                <input 
                                    className="form-control border border-info"
                                    type="text" 
                                    name="subTotal" 
                                    value={ele.subTotal} 
                                    disabled={true} 
                                />
                            </div>
                            {productsDetails.length > 1 && 
                                <button
                                    className="mx-1 "
                                    style={{border:'none', backgroundColor:"#EBEBF3"}}
                                    onClick={(e) => {handleRemove(e, i)}}>
                                        &nbsp; <i className="fas fa-minus-circle my-4" style={{color:"red", backgroundColor:"#EBEBF3", fontSize:"25px"}}></i>
                                </button>
                                }
                            {i === productsDetails.length-1 && 
                                <button 
                                    className="mx-1"
                                    style={{border:'none', backgroundColor:"#EBEBF3"}} 
                                    onClick={handleAdd}>
                                        &nbsp;<i className="fas fa-plus-circle my-4" style={{color:"green",backgroundColor:"#EBEBF3", fontSize:"25px"}}></i>
                                </button>
                            }
                            
                        </div>
                    </div>
                )
            })}
            <div className="col-2 form-group my-3" >
                <label className="my-2">Total</label>
                <input className="form-control border border-info"type="text" value={total} disabled={true} /><br/>
            </div>
            
            <button onClick={handleSubmit} className="btn btn-success btn-lg">Create</button>
        </div>
    )
}

export default BillingForm