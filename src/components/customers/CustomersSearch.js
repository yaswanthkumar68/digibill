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
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetCustomers())
    }, [])

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
            <h2>Total customers - {customers.length}</h2>
            <input type="text" value={search} onChange={handleSearch} />
            <div>
                <CustomersList list={list} />
            </div>
        </div>
    )
}

export default CustomersSearch