import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { asyncCreateCustomer, asyncEditCustomer } from '../../actions/customersAction'
import { swal } from '../../selectors/alerts'

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
                dispatch(asyncEditCustomer(editData._id, details))
                reset()
                swal(`${details.name} details updated successfully`)
            }
            else{
                //console.log(details, 'create')
                dispatch(asyncCreateCustomer(details))
                swal(`${details.name}   details created sucessfully`)
            }
            
            setDetails({name :'', mobile : '', email : ''})
        }
        else{
            setFormErrors(errors)
        }
        
    }
    

    return(
        <div className="my-3" style={{borderRadius:"10px", boxShadow:"0px 0px 4px #333", backgroundColor:"whitesmoke"}}>
            <form onSubmit={handleSubmit} className="row justify-content-md-center py-3">
                <div className="col-3 form-group">
                    <label>Name</label><br/>
                    <input
                        className="form-control border border-dark" 
                        type="text" 
                        name="name" 
                        value={details.name} 
                        onChange={handleChange} 
                        onFocus={handleFocus}
                    />{formErrors.name && <span class="text-danger">{formErrors.name}</span>}<br/>
                </div>
                
                <div className="col-3 form-group">
                    <label>Mobile</label><br/>
                    <input 
                        className="form-control border border-dark"
                        type="text" 
                        name="mobile" 
                        value={details.mobile} 
                        onChange={handleChange} 
                        onFocus={handleFocus}
                    />{formErrors.mobile && <span class="text-danger">{formErrors.mobile}</span>}<br/>
                </div>
                
                <div className="col-3 form-group">
                    <label>Email</label><br/>
                    <input 
                        className="form-control border border-dark"
                        type="text" 
                        name="email" 
                        value={details.email} 
                        onChange={handleChange} 
                        onFocus={handleFocus}
                    />{formErrors.email && <span class="text-danger">{formErrors.email}</span>}<br/>
                </div>
                <div className="col-1">
                    <input type="submit" value={status ? "Update" : "Create"} className="btn btn-success btn-lg my-3" />
                </div>
                
            </form>
        </div>
    )
}

export default CustomerForm
