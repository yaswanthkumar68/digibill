import React from 'react'
import { useSelector } from 'react-redux'

const Account = (props) => {
    const status = useSelector((state) => {
        return state.status
    })

    return(
        <div className="row my-5 justify-content-center" style={{margin:"1.5em"}}>
            <div className="col-5 text-center" style={{marginTop:"5em"}}>
                <i className="fas fa-user my-2" style={{fontSize:"100px"}}></i>
                <h2 className="my-2">{status.account.username}</h2>
                <h3 className="my-2">{status.account.email}</h3>
                <h3 className="my-2">{status.account.businessName}</h3>
                <h3 className="my-2">{status.account.address}</h3>
            </div>

        </div>
    )
}

export default Account