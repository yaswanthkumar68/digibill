import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = (props) => {
    const status = useSelector((state) => {
        return state.status
    })

    return(
        <div>
            <h1>welcome {status.account.username}</h1>
        </div>
    )
}

export default Dashboard