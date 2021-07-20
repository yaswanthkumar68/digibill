import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useSelector } from 'react-redux'
import { getName, getProduct } from '../../selectors/bills'

const BillInfo = (props) => {
    const { id } = props.match.params
    const { state } = props.location

    const customers = useSelector(state => state.customers)
    const products = useSelector(state => state.products)
    const status = useSelector(state => state.status)

    const invoiceRef = useRef()
    const invoiceStyle = `
        @page {
            margin-top: 30mm
        }`

    const pdfInvoice = useReactToPrint({
        content:() => invoiceRef.current,
        pageStyle: invoiceStyle
    })
    return(
        <div>
            {state && customers.length && products.length ?
            <div> 
                <div ref={invoiceRef} className="my-4 w-75 mx-auto" style={{marginLeft:"1.5em", border:"1px solid black", padding:"1.5em 4em", backgroundColor:"whitesmoke"}}>
                    <div className="row">
                        <h3 className="col-5">DigiBill</h3>
                    </div>
                    <div className="row">
                        <h4 className="col-12 text-center">Invoice</h4>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                        <h5>Bill id : {id} </h5>
                        <h5>Date : {new Date(state.date).toISOString().split('T')[0]}</h5>
                    </div>
                    
                    <div className="d-flex justify-content-between my-3">
                        <div>
                            <h4>Business details</h4>
                            <h6>{status.account.username}</h6>
                            <h6>{status.account.businessName}</h6>
                            <h6>{status.account.address}</h6>
                        </div>
                        <div>
                            <h4>Customer details</h4>
                            <h6>{getName(state.customer, customers).name} </h6>
                            <h6>cell - {getName(state.customer, customers).mobile} </h6>
                        </div>
                    </div>
                    <table className="table table-hover  text-center my-3">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Product name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.lineItems.map((ele, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{getProduct(ele.product, products).name}</td>
                                    <td>{ele.quantity}</td>
                                    <td>{ele.price}/-</td>
                                    <td>{ele.subTotal}/-</td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </table>
                    <h4 className="text-end my-2">Total - Rs.{state.total}/-</h4>
                </div>
                <div className="row justify-content-center my-3">
                    <button className="btn btn-success col-1" onClick={pdfInvoice}>Print</button>
                </div>   
            
            </div> : null
            }
        </div>
    )
}
export default BillInfo