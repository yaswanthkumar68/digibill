import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { asyncLoginStatus } from '../../actions/statusAction'
import './authentication.css'

const Login = (props) => {
    const [ serverErrors, setServerErrors ] = useState({})

    const status = useSelector((state) => {
        return state.status
    })
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(status.logInStatus){
    //         props.history.push('/dashboard')
    //         //console.log(status.logInStatus)
    //     }
    // }, [status])

    const handleFocus = () => {
        setServerErrors({})
    }

    const formik = useFormik({
        initialValues : {
            email : 'yaswanth17@gmail.com',
            password : 'secret123'
        },

        validationSchema : Yup.object({
            email : Yup.string()
                    .email('invalid email address')
                    .required('email cannot be blank'),
            password : Yup.string()
                    .min(8, 'password must be minimum 8 characters')
                    .required('password cannot be blank')
        }), 
        onSubmit : ((values, {resetForm}) => {
            const handleServerErrors = (errors) => {
                setServerErrors(errors)
            }
            //console.log(values)
            dispatch(asyncLoginStatus(values, handleServerErrors))
            resetForm({values : ''})
        })
    })


    return(
        <div className="auth-container">
            <div className="row">
                <div className="col">
                    <h1 className="px-4 animate__animated animate__fadeIn"><span style={{fontSize:"55px"}}>D</span>igi<span style={{fontSize:"55px"}}>B</span>ill</h1>
                </div>
            </div>
            <div className="row gx-5 justify-content-md-center align-items-center m-3">
                <div className="col-md-6">
                    <h1 className="text-left animate__animated animate__zoomIn">Turn all your business data into digital by using our app </h1>
                </div>
                <div className="col-md-3 my-3 login">
                    <h3 className="text-center mb-3">Login here</h3>
                    {Object.keys(serverErrors).length ? <h5 className="text-danger">{serverErrors.errors}</h5> : null}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-3 w-100">
                            <label htmlFor="email">Email</label>
                            <input
                                className="form-control border border-dark"
                                type="text"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                onFocus={handleFocus}
                                
                            />
                            {formik.touched.email && formik.errors.email ?
                                <span class="text-danger">{formik.errors.email}</span> : null
                            }
                        </div>
                        <div className="form-group mb-3 w-100">
                            <label htmlFor="password">Password</label>
                            <input 
                                className="form-control border border-dark"
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onFocus={handleFocus}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <span class="text-danger">{formik.errors.password}</span> : null
                            }
                        </div>
                        <input type="submit" value="Login" className="button-authentication" />
                        
                    </form>

                    <h5 className="text-left my-3 " style={{fontSize:"16px"}}>Create a new account here <Link to='/register'>Register</Link></h5>
                </div>
            </div>
            
            
        </div>
    )
}

export default Login