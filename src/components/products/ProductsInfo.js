import React from 'react'
import { useDispatch } from 'react-redux'
import {asyncRemoveProduct } from '../../actions/productsAction'
import Swal from 'sweetalert2'
import { swal } from '../../selectors/alerts'

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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText:'No'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(asyncRemoveProduct(id))
                removeProduct()
                swal('Product is deleted sucessfully')
            }
          })     
    }

    return(
        <div className="row" style={{overflowY:"auto", height:"70vh"}}>
            {list.map((ele) => {
                return(
                    <div key={ele._id} className="col-2 w-25 text-center my-3  animate__animated animate__zoomIn " style={{minHeight:"250px"}}>
                        <i className="fas fa-boxes" style={{fontSize:"100px"}}></i><br/><br/>
                        <h5 style={{color:"green"}}>{ele.name}</h5>
                        <h5 style={{color:"crimson"}}>Rs - {ele.price}</h5>
                        <button className="btn btn-success" onClick={() => {handleEdit(ele._id, ele.name, ele.price)}}><i class="far fa-edit"></i></button>&nbsp;&nbsp;
                        <button className="btn btn-danger" onClick={() => {handleRemove(ele._id)}}><i class="far fa-trash-alt"></i></button> 
                    </div>
                )

            })}
        </div>
    )
}

export default ProductsInfo