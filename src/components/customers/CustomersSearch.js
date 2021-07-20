import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetCustomers } from '../../actions/customersAction'
import CustomersList from './CustomersList'

const CustomersSearch = (props) => {
    const [list, setList ] = useState([])
    const [search, setSearch ] = useState('')

    const customers = useSelector((state) => {
        return state.customers
    })

    useEffect(() => {
        if(search === ''){
            setList(customers)
        }
        else{
            const result = customers.filter((ele) => {
                return ele.name.toLowerCase().includes(search.toLowerCase().trim())
            })
            setList(result)
        }
    }, [customers, search])

    const handleSearch = (e) => {
        const result = e.target.value
        setSearch(result)
    }

    return(
        <div>
            <div className="row my-4 justify-content-md-center">
                <h3 className="col-5" style={{color:"crimson"}}>Total customers - {customers.length}</h3>
                <input type="search" className="col-4" value={search} onChange={handleSearch} placeholder="search by name"/>
            </div>
            
            <div>
                <CustomersList list={list} />
            </div>
        </div>
    )
}

export default CustomersSearch