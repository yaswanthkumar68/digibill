import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component:Component, ...rest}) => {

    // const status = useSelector(state => state.status)

    return(
        <Route
             {...rest} render = {(props) => {
                return localStorage.getItem('token') ? (
                    <Component {...props} /> ) : (
                    <Redirect
                        to={{
                            pathname:'/'
                        }}
                    />
                )

            }}
        />
    )
}

export default PrivateRoute