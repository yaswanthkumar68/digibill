import React from 'react'
import { Link } from 'react-router-dom'

const CustomersList = (props) => {
    const { list } = props
    return(
        <div className="row" style={{overflowY:"auto", height:"52vh"}}>
            {list.map((ele, i) => {
                return(
                    <div key={i} className="col-2 text-center my-3 animate__animated animate__zoomIn">
                        <i className="fas fa-user py-3" style={{fontSize:"100px"}}></i>
                        <h4 style={{color:"crimson"}}>{ele.name}</h4>
                        <button className="btn btn-info"><Link to={{pathname :`/customers/${ele._id}`, state: ele}} style={{textDecoration:"none", color:"white"}}>Show</Link></button>
                    </div>
                )
            })}
        </div>
    )

}

export default CustomersList