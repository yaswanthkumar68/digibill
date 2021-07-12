import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

import { asyncRegisterStatus, resetRegisterStatus } from '../../actions/statusAction'

const Register = (props) => {  
    
    const status = useSelector((state) => {
        return state.status
    })

    useEffect(() => {
        if(status.registerStatus){
            dispatch(resetRegisterStatus())
            props.history.push('/')
        }

    }, [status])

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues : {
            username : '',
            email : '',
            password : '',
            businessName : '',
            address : ''
        },

        validationSchema : Yup.object({
            username : Yup.string()
                        .min(4, 'username must be having minimum 4 characters')
                        .max(20, 'username must be having 20 characters or less')
                        .required('username cannot be blank'),
            email : Yup.string()
                    .email('invalid email address')
                    .required('email cannot be blank'),
            password : Yup.string()
                        .min(8, 'password must be minimum 8 characters')
                        .required('password cannot be blank'),
            businessName : Yup.string()
                        .required('business name required'),
            address : Yup.string()
                       .required('address is required') 
        }),

        onSubmit : (values, {resetForm}) => {
            console.log(values)
            dispatch(asyncRegisterStatus(values))
            resetForm({values : ''})
        }
    })

    return(
        <div>
            <h1>Register here</h1>
            <form onSubmit={formik.handleSubmit}>
                <label>Username</label><br/>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                /><br/>
                {formik.touched.username && formik.errors.username ?
                    <span>{formik.errors.username}</span> : null
                }<br/>

                <label>Email</label><br/>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                /><br/>
                {formik.touched.email && formik.errors.email ?
                    <span>{formik.errors.email}</span> : null
                }<br/>
                
                <label>Password</label><br/>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                /><br/>
                {formik.touched.password && formik.errors.password ?
                    <span>{formik.errors.password}</span> : null
                }<br/>

                <label>Business name</label><br/>
                <input 
                    type="text"
                    id="businessName"
                    name="businessName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessName}
                /><br/><br/>


                <label>Address</label><br/>
                <textarea
                    type="text"
                    name="address"
                    id="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    rows="5"
                    cols="30"
                >
                </textarea><br/><br/>

                <input type="submit" value="Register" /><br/>
            </form>
            <h3>Already have an account <Link to="/">Login here</Link></h3>
        </div>
    )
}

export default Register