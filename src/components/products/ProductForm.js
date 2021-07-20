import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { asyncCreateProduct, asyncEditProduct } from '../../actions/productsAction'
import { swal } from '../../selectors/alerts'

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

        if(price === ''){
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
                swal(`${details.name} details updated successfully`)
                resetStatus()
            }
            else{
                dispatch(asyncCreateProduct(details))
                swal(`${details.name} details created successfully`)
            }
            setName('')
            setPrice('')
        }
        else{
            setFormErrors(errors)
        }
    }



    return(
        <div className="my-3" style={{borderRadius:"10px", boxShadow:"0px 0px 4px #333", backgroundColor:"whitesmoke"}}>
            <form onSubmit = {handleSubmit} className="row justify-content-md-center py-3">
                    <div className="col-4 form-group">
                        <label>Name of product</label>
                        <input 
                            className="form-control border border-dark"
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={handleChange} 
                            onFocus={handleFocus} 
                        />{formErrors.name && <span class="text-danger">{formErrors.name}</span>}<br/>
                    </div>
                    
                    <div className="col-4 form-group">
                        <label>Price of product</label>
                        <input 
                            className="form-control border border-dark"
                            type="number" 
                            name="price" 
                            value={price} 
                            onChange={handleChange} 
                            onFocus={handleFocus} 
                        />{formErrors.price && <span class="text-danger">{formErrors.price}</span>}<br/>
                    </div>
                    <div className="col-1 form-group">
                        <input type="submit" value={status ? "Update" :"Create" } className="btn btn-success btn-lg my-3" />
                    </div>
            </form>
        </div>
    )
    
}

export default ProductForm