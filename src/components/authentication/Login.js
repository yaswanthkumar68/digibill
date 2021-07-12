import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { asyncLoginStatus } from '../../actions/statusAction'
// import './style.css'

const Login = (props) => {

    const status = useSelector((state) => {
        return state.status
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if(status.logInStatus){
            props.history.push('/dashboard')
        }
    }, [status])

    const formik = useFormik({
        initialValues : {
            email : 'sulyagupta@gmail.com',
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
            console.log(values)
            dispatch(asyncLoginStatus(values))
            resetForm({values : ''})
        })
    })


    return(
        <div className="login-container">
            <div>
                <h1>DigiBill</h1>
            </div>
            <h1>Login here</h1>
            <form onSubmit={formik.handleSubmit}>
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
                }<br/><br/>

                <input type="submit" value="Login" />
            </form>

            <h3>Create a new account here <Link to='/register'>Register</Link></h3>
        </div>
    )
}

export default Login