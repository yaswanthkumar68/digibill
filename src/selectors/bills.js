export const getAllMobileNumbers = (customers) => {
    const result = customers.map((ele) => {
        return ele.mobile
    })
    return result
}

export const getProductsName = (products) => {
    const result = products.map((ele) => {
        return ele.name
    })
    return result
}

export const getName = (id, customers) => {
    if(customers.length){
    const result = customers.find((ele) => {
        return ele._id === id
    })
    return result
    }
}

export const getProduct = (id, products) => {
    if(products.length){
    const result = products.find((ele) => {
        return ele._id === id
    })
    return result ? result.name : "product is deleted"
    }
}

export const getProductDetails = (value, index,products, productsDetails) => {
    const result = products.find((ele) => {
        return ele.name.toLowerCase() === value.toLowerCase()
    })

    if(result){
        const updatedResult = productsDetails.map((ele, i) => {
            if(i === index){
                return {...ele, name: result.name, id: result._id, price: result.price}
            }
            else{
                return ele
            }
        })
        //console.log(updatedResult)
        return updatedResult
    }else{
        return undefined
    }
}

export const getProductAmount = (index, productsDetails) => {
    const updatedResult = productsDetails.map((ele, i) => {
        if(i === index){
            const amount = ele.quantity*ele.price
            return {...ele, subTotal:amount}
        }
        else{
            return ele
        }
    })
    return updatedResult
}


