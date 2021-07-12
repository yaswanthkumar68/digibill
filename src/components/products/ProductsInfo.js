import React from 'react'
import { useDispatch } from 'react-redux'
import {asyncRemoveProduct } from '../../actions/productsAction'

const ProductsInfo = (props) => {
    const { list, removeProduct, editProduct } = props
    const dispatch = useDispatch()

    const handleEdit = (id, name, price) => {
        const data = {
            id : id,
            name : name,
            price : price
        }
        editProduct(data)
    }
    const handleRemove = (id) => {
        dispatch(asyncRemoveProduct(id))
        alert('product removed successfully')
        removeProduct()
        
    }

    return(
        <div>
            {list.map((ele) => {
                return(
                    <div key={ele._id}>
                        <h3>{ele.name}</h3>
                        <h3>{ele.price}</h3>
                        <button onClick={() => {handleEdit(ele._id, ele.name, ele.price)}}>Edit</button>
                        <button onClick={() => {handleRemove(ele._id)}}>Remove</button> 
                    </div>
                )

            })}
        </div>
    )
}

export default ProductsInfo