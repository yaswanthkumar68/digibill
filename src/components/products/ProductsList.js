import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetProducts } from '../../actions/productsAction'
import ProductsInfo from './ProductsInfo'


const ProductsList = ({handleClick}) => {
    const [ list, setList ]  = useState([])
    const [ search, setSearch ] = useState('')
    const [ sort, setSort ] = useState('')

    const products = useSelector((state) => {
        return state.products
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetProducts())
    }, [])

    useEffect(() => {
        if(search === ''){
            setList([...products])
            setSort('')
        }
        else{
            const result = products.filter((ele) => {
                return ele.name.toLowerCase().includes(search.toLowerCase().trim())
            })
            setList(result)
        }
    }, [products, search])

    const editProduct = (data) => {
        handleClick(data)
        setSearch('')
        setSort('')
    }

    const removeProduct = () => {
        setSearch('')
        setSort('')
    }
    const handleSearch = (e) => {
        setSearch(e.target.value)
    } 

    const handleOption = (e) => {
        const result = e.target.value
        setSort(result)

        if(result === 'Low to High'){
            const order = list.sort((a, b) => {
                return a.price - b.price
            })
            setList(order)
        }
        else if(result === 'High to Low'){
            const order = list.sort((a, b) => {
                return b.price - a.price
            })
            setList(order)
        }
        else if(result === ''){
            setList([...products])
        }
    }

    return(
        <div>
            <h2>Total products - {products.length}</h2>
            <input type="text" value={search} onChange={handleSearch} />
            <select value={sort} onChange={handleOption}>
                <option value=''>Sort by</option>
                <option value='Low to High'>Low to High</option>
                <option value='High to Low'>High to Low</option>
            </select>
            <ProductsInfo list={list} removeProduct={removeProduct} editProduct={editProduct} />
        </div>
    )
}

export default ProductsList