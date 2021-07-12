import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { asyncCreateProduct, asyncEditProduct } from '../../actions/productsAction'


const ProductForm = (props) => {
    const { resetStatus, data , status } = props
    
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    useEffect(() => {
        if(status){
            setName(data.name)
            setPrice(data.price)
        }
    }, [status])

    const dispatch = useDispatch()

    const handleChange = (e) => {
        if(e.target.name === "name"){
            setName(e.target.value)
        }
        else if(e.target.name === "price"){
            setPrice(e.target.value)
        }
    }

    const formValidation = () => {
        if(name.trim() === ''){
            errors.name = 'name of product cannot be blank'
        }

        if(price.trim() === ''){
            errors.price = 'price of product cannot be blank'
        }
    }

    const handleFocus = () => {
        setFormErrors(errors)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        formValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const details = {
                name :  name,
                price : price
            }
            
            if(status){
                dispatch(asyncEditProduct(data.id, details))
                resetStatus()
            }
            else{
                dispatch(asyncCreateProduct(details))
            }
            setName('')
            setPrice('')
        }
        else{
            setFormErrors(errors)
        }
    }



    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Name of product</label><br/>
                <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={handleChange} 
                    onFocus={handleFocus} 
                />{formErrors.name && <span>{formErrors.name}</span>}<br/>

                <label>Price of product</label><br/>
                <input 
                    type="number" 
                    name="price" 
                    value={price} 
                    onChange={handleChange} 
                    onFocus={handleFocus} 
                />{formErrors.price && <span>{formErrors.price}</span>}<br/>

                <input type="submit" value={status ? "update" :"save" } />
            </form>
        </div>
    )
    
}

export default ProductForm