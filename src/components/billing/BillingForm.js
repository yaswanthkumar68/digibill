import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Hint } from 'react-autocomplete-hint'
import { asyncCreateBill } from '../../actions/billsAction'


const BillingForm = (props) => {
    const [ customerDetails, setCustomerDetails ] = useState({id:'', name:'', mobile:''})
    const [ productsDetails, setProductDetails ] = useState([{id:'', name:'', price:'', quantity:'', subTotal:''}])
    const [ total, setTotal ] = useState('')
    const date = new Date().toISOString().split('T')[0]

    const dispatch = useDispatch()

    useEffect(() => {
        let totalAmount = 0
        productsDetails.forEach((ele) => {
            totalAmount += Number(ele.subTotal)
        })
        //console.log(totalAmount)
        setTotal(totalAmount)
    }, [productsDetails])

    // customer details
    const customers = useSelector((state) => {
        return state.customers
    })
    const result = customers.map((ele) =>{
        return ele.mobile
    })
    //console.log(result)

    const handleBlur = () => {
        const customer = customers.find((ele) => {
            return ele.mobile === customerDetails.mobile
        })
        // console.log(customer)
        if(customer){
            const details = {...customerDetails}
            setCustomerDetails({...details, id:customer._id, name:customer.name})
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
    // console.log(customerDetails)

    // Products Information
    const products = useSelector((state) => {
        return state.products
    })
    const productsName = products.map((ele) => {
        return ele.name
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

    const handleRemove = (i) => {
        const result = productsDetails.filter((ele,index) => {
            return i !== index
        })
        setProductDetails(result)
    }

    const handleProductBlur = (e, index) => {
        const {name, value} = e.target
        //console.log(e.target.name)
        if(name === 'name'){
            const result = products.find((ele) => {
                return ele.name === value
            })
            // console.log(result)
            if(result){
                const updatedResult = productsDetails.map((ele, i) => {
                    if(i === index){
                        return {...ele, id: result._id, price: result.price}
                    }
                    else{
                        return ele
                    }
                })
                setProductDetails(updatedResult)
            }
            else if(result && productsDetails.name){
                alert('product item is not found in the list')
                const result = productsDetails.map((ele, i) => {
                    if(i === index){
                        return {...ele, name: ''}
                    }
                    else{
                        return ele
                    }
                })
                setProductDetails(result)

            }
        }
        else if(name === 'quantity'){
            const updatedResult = productsDetails.map((ele, i) => {
                if(i === index){
                    const amount = ele.quantity*ele.price
                    return {...ele, subTotal:amount}
                }
                else{
                    return ele
                }
            })
            setProductDetails(updatedResult)
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
        dispatch(asyncCreateBill(data))
        //console.log(data)
    }

    //console.log(productsDetails)
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Date</label><br/>
                <input type="text" defaultValue={date} disabled={true}/><br/>
                <div style={{display:"flex"}}>
                    <div>
                        <label>Customer mobile</label><br/>
                        <Hint options={result} allowTabFill={true}>
                            <input 
                                type="text" 
                                name="mobile" 
                                value={customerDetails.mobile} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                            />
                        </Hint>
                        
                    </div>
                    <div>
                        <label>Customer name</label><br/>
                        <input 
                            type="text" 
                            name="name" 
                            value={customerDetails.name} 
                            disabled={true} 
                        />
                    </div>
                    <div>
                        <label>Customer id</label><br/>
                        <input 
                            type="text" 
                            name="id" 
                            value={customerDetails.id} 
                            disabled={true} 
                        />
                    </div>
                </div>
                {productsDetails.map((ele, i) => {
                    return(
                        <div style={{display:"flex"}} key={i}>
                            <div>
                                <label>Product name</label><br/>
                                <Hint options={productsName} allowTabFill={true}>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={ele.name} 
                                        onChange={(e) => {handleProductChange(e, i)}}
                                        onBlur={(e) => {handleProductBlur(e, i)}}
                                        // onFocus={handleProductFocus}
                                    />
                                </Hint>
                                
                            </div>
                            <div>
                                <label>Product Quantity</label><br/>
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    value={ele.quantity} 
                                    onChange={(e) => {handleProductChange(e, i)}}
                                    onBlur={(e) => {handleProductBlur(e, i)}}
                                //     onFocus={handleProductFocus}
                                />
                            </div>
                            <div>
                                <label>Sub total</label><br/>
                                <input 
                                    type="text" 
                                    name="subTotal" 
                                    value={ele.subTotal} 
                                    disabled={true} 
                                />
                                {productsDetails.length > 1 && 
                                    <button
                                        style={{border:'none', backgroundColor:"whitesmoke"}}
                                        onClick={() => {handleRemove(i)}}>
                                            &nbsp; <i className="fas fa-minus-circle" style={{color:"red"}}></i>
                                    </button>
                                    }
                                {i === productsDetails.length-1 && 
                                    <button 
                                        style={{border:'none'}} 
                                        onClick={handleAdd}>
                                            &nbsp;<i className="fas fa-plus-circle" style={{color:"green"}}></i>
                                    </button>
                                }<br/>
                                
                            </div>
                        </div>
                    )
                })}<br/><br/>
                <label style={{marginLeft:'290px'}}>Total &nbsp;</label><input type="text" value={total} disabled={true} /><br/>
                <input type="submit" value="Create" />
            </form>

        </div>
    )
}

export default BillingForm