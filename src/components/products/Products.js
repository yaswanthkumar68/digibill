import React, { useState } from 'react'
import ProductForm from './ProductForm'
import ProductsList from './ProductsList'

const Products = (props) => {
    const [ status, setStatus ] = useState(false)
    const [ data, setData ] = useState({})

    const handleClick = (details) =>{
        setData(details)
        setStatus(true)
    }
   
    const resetStatus = () => {
        setStatus(false)
    }


    return(
        <div>
            <h2>Products component</h2>
            <ProductForm  data={data} resetStatus={resetStatus} status={status}/>
            <ProductsList  handleClick={handleClick}/>
        </div>
    )
}

export default Products