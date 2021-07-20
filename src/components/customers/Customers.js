import React, { useState, useEffect} from 'react'

import CustomerForm from './CustomerForm'
import CustomersSearch from './CustomersSearch'

const Customers = (props) => {
    const [ editData, setEditData ] = useState({})
    const [ status, setStatus ] = useState(false)


    useEffect(() => {
        if(props.location.state){
            setEditData(props.location.state)
            setStatus(true)
        }
    }, [])

    //console.log(props.location.state, 'state')
    //console.log(status)

    const reset = () => {
        setStatus(false)
        setEditData({})
        props.history.replace({
            path : '/customers',
            state : null
        })
    }


    return(
        <div style={{marginLeft:"1em"}}>
            <CustomerForm editData={editData} status={status} reset={reset} />
            <CustomersSearch />
        </div>
    )
}

export default Customers