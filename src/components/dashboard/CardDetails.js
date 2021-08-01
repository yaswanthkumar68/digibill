import React from 'react'
import './dashBoard.css'

const CardDetails = (props) => {
    const{ itemName, data, icon , text} = props

    return(
        <div className={`d-flex justify-content-around  align-items-center text-center animate__animated animate__zoomIn cards ${text}`} >
            <div>
                <p>{icon}</p>
            </div>
            <div>
                <h2>{itemName}</h2>
                <h2>{data}</h2>
            </div>
            
        </div>
    )
}

export default CardDetails