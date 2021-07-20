import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

import { asyncRegisterStatus, resetRegisterStatus } from '../../actions/statusAction'
import './authentication.css'

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
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="px-4 animate__animated animate__fadeIn"><span style={{fontSize:"55px"}}>D</span>igi<span style={{fontSize:"55px"}}>B</span>ill</h1>
                </div>
            </div>
            <div className="row gx-5 justify-content-md-center align-items-center mx-3 mb-5">
                <div className="col-md-6">
                    <h1 className="text-left animate__animated animate__zoomIn">Now its easy to store all of your business data at one place</h1>
                </div>
                <div className="col-md-4 my-3">
                    <h3 className="text-left mb-3">Register here</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-4 w-75">
                        <label htmlFor="username">Username</label>
                        <input 
                            className="form-control border border-dark"
                            type="text"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ?
                            <span class="text-danger">{formik.errors.username}</span> : null
                        }
                        </div>

                        <div className="form-group mb-4 w-75">
                        <label htmlFor="email">Email</label><br/>
                        <input
                            className="form-control border border-dark"
                            type="text"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <span class="text-danger">{formik.errors.email}</span> : null
                        }
                        </div>
                        
                        <div className="form-group mb-4 w-75">
                        <label htmlFor="password">Password</label>
                        <input 
                            className="form-control border border-dark"
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <span class="text-danger">{formik.errors.password}</span> : null
                        }
                        </div>

                        <div className="form-group mb-4 w-75">
                        <label htmlFor="businessName">Business name</label>
                        <input 
                            className="form-control border border-dark"
                            type="text"
                            id="businessName"
                            name="businessName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.businessName}
                        />
                        {formik.touched.businessName && formik.errors.businessName ?
                            <span class="text-danger">{formik.errors.businessName}</span> : null
                        }
                        </div>

                        <div className="form-group mb-4 w-75">
                        <label htmlFor="address">Address</label>
                        <textarea
                            className="form-control border border-dark"
                            type="text"
                            name="address"
                            id="address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            rows="5"
                            cols="30"
                        >
                        </textarea>
                        {formik.touched.address && formik.errors.address ?
                            <span class="text-danger">{formik.errors.address}</span> : null
                        }
                        </div>
                        <input type="submit" value="Register" className="button-authentication"/>
                    </form>
                    <h5 className="text-left my-3">Already have an account <Link to="/">Login here</Link></h5>

                </div>
            
            </div>
        </div>
    )
}

export default Register