import React from 'react'
import { useSelector } from 'react-redux'
import { getProductQuantity, getTopProducts } from '../../selectors/dashboard'

const TopProducts = (props) => {
    const products = useSelector(state => state.products)
    const bills = useSelector(state => state.bills)

    const result = getProductQuantity(products, bills)
    const sortedTopProducts = getTopProducts(result)
    
    //console.log(sortedTopProducts)

    

    return(
        <>
            {products.length && bills.length ?
                <div className="col-4 mt-2 dashboard-table animate__animated animate__zoomIn" style={{backgroundColor:"whitesmoke", borderRadius:"10px"}}>
                    <h2 className="text-center my-2">Top Products</h2>
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Name of Product</th>
                                <th>Quantities sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTopProducts.map((ele, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.count}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div> : null
            } 
        </>

    )
}

export default TopProducts