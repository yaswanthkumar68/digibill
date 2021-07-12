import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { asyncCreateCustomer, asyncEditCustomer } from '../../actions/customersAction'

const CustomerForm = ({editData, status, reset}) => {
    const [ details, setDetails ] = useState({name : '', mobile : '', email : ''})
    const [formErrors, setFormErrors ] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    useEffect(() => {
        if(status){
            const data = {...details}
            setDetails({...data, 
                name : editData.name, 
                mobile : editData.mobile, 
                email : editData.email ? editData.email : '' 
            })
        }
        

    }, [status])

    const handleChange = (e) => {
        const { name, value } = e.target
        const customer = {...details}
        setDetails({...customer, [name] : value})
    }

    // form validation
    const formValidation = () => {
        if(details.name.trim() === ""){
            errors.name = "name cannot be blank"
        }
        else if(!validator.isAlpha(details.name)){
            errors.name = "name must be in alphabets only"
        }

        if(details.mobile.trim() === ""){
            errors.mobile = " mobile number cannot be blank"
        }
        else if(!validator.isMobilePhone(details.mobile) || details.mobile.trim().length < 10 || 
                details.mobile.trim().length > 10){
            errors.mobile = "mobile number is invalid"
        }

        if(!validator.isEmail(details.email) && details.email.trim() !== ''){
            errors.email =" email is invalid"
        }
    }

    const handleFocus = () => {
        setFormErrors(errors)
    }

    // form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        formValidation()
        //console.log(errors)

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            if(status){
                console.log(details, 'updated')
                dispatch(asyncEditCustomer(editData._id, details))
                reset()
            }
            else{
                console.log(details, 'create')
                dispatch(asyncCreateCustomer(details))
            }
            
            setDetails({name :'', mobile : '', email : ''})
        }
        else{
            setFormErrors(errors)
        }
        
    }
    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br/>
                <input 
                    type="text" 
                    name="name" 
                    value={details.name} 
                    onChange={handleChange} 
                    onFocus={handleFocus}
                />{formErrors.name && <span>{formErrors.name}</span>}<br/>

                <label>Mobile</label><br/>
                <input 
                    type="text" 
                    name="mobile" 
                    value={details.mobile} 
                    onChange={handleChange} 
                    onFocus={handleFocus}
                />{formErrors.mobile && <span>{formErrors.mobile}</span>}<br/>

                <label>Email</label><br/>
                <input 
                    type="text" 
                    name="email" 
                    value={details.email} 
                    onChange={handleChange} 
                    onFocus={handleFocus}
                />{formErrors.email && <span>{formErrors.email}</span>}<br/>

                <input type="submit" value={status ? "update" : "create"} />
            </form>
        </div>
    )
}

export default CustomerForm
