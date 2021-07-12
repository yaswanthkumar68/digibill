import React from 'react'
import { useSelector } from 'react-redux'

const Account = (props) => {
    const status = useSelector((state) => {
        return state.status
    })

    return(
        <div>
            <div>
                <i className="fas fa-user" style={{fontSize:"100px"}}></i>
                <h2>{status.account.username}</h2>
            </div>
            <div>
                <h3>Email : {status.account.email}</h3>
                <h3>Business : {status.account.businessName}</h3>
                <h3>Address : {status.account.address}</h3>
            </div>

        </div>
    )
}

export default Account