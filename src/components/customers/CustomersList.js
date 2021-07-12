import React from 'react'
import { Link } from 'react-router-dom'

const CustomersList = (props) => {
    const { list } = props
    return(
        <div>
            {list.map((ele, i) => {
                return(
                    <div key={i}>
                        <h2>{ele.name}</h2>
                        <button><Link to={{pathname :`/customers/${ele._id}`, state: ele}} style={{textDecoration:"none", color:"blue"}}>Show</Link></button>
                    </div>
                )
            })}
        </div>
    )

}

export default CustomersList