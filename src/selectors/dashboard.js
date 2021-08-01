// total bill amount

export const totalIncome = (bills) => {
    let total = 0
    bills.forEach((ele) => {
        total += ele.total
    })
    return total
}


// last 5 invoices

export const getLastInvoices = (bills) => {
    const count = bills.length
    const result = []
    if(count > 5){
        for(let i = (count-1); i >= (count-5); i-- ){
            result.push(bills[i])
        }
    }
    else{
        for(let i = (count-1); i >=0; i-- ){
            result.push(bills[i])
        }
    }
    return result
    
}

// top customers-total amount spend

export const getCustomersAmount = (customers, bills) => {
    const result = customers.map((ele) => {
        const customerObject = {}
        const res = bills.filter((bill) => {
            return bill.customer === ele._id
        })
        let total = 0
        res.forEach((ele) => {
            total += ele.total
        })
        customerObject.name = ele.name
        customerObject.mobile = ele.mobile
        customerObject.amount = total
        return customerObject
    })
    return result
}

export const getTopCustomers = (data) => {
    data.sort((a,b) => {
        return b.amount- a.amount
    })
    
    const customersLength = data.length
    const result = []
    if(customersLength > 5){
        for(let i = 0; i < 5; i++){
            if(data[i].amount){
                result.push(data[i])
            }
        }
    }
    else{
        for(let i = 0; i <= customersLength - 1; i++){
            if(data[i].amount){
                result.push(data[i])
            }
        }
    }
    return result

}

export const getProductQuantity = (products, bills) => {
    const result = products.map((ele) => {
        let obj = {}
        obj.name = ele.name
        obj.count = 0
        bills.forEach((eachBill) => {
            //console.log(eachBill.lineItems)
            const productDetails = eachBill.lineItems.find((pro) => {
                return ele._id === pro.product
            })
           if(productDetails){
                obj.count += Number(productDetails.quantity)
           }
            
        })
        return obj
    })
    return result
}

export const getTopProducts = (data) => {
    data.sort((a,b) => {
        return b.count- a.count
    })
    
    const productsLength = data.length
    const result = []
    if(productsLength > 5){
        for(let i = 0; i < 5; i++){
            if(data[i].count){
                result.push(data[i])
            }
            
        }
    }
    else{
        for(let i = 0; i < productsLength ; i++){
            if(data[i].count){
                result.push(data[i])
            }
        }
    }
    return result

}


//last 7 days billsdata

export const getLastBillsData = (bills) => {
    const billDates = []
    bills.forEach((data) => {
        if(!billDates.includes(new Date(data.date).toISOString().split('T')[0])){
            billDates.push(new Date(data.date).toISOString().split('T')[0])
        }
    })
    //console.log(billDates)

    const billsData = billDates.map((ele) => {
        let obj = {}
        obj.date = ele
        obj.netAmount = 0
        bills.forEach((bill) => {
            if(new Date(bill.date).toISOString().split('T')[0] === ele){
                obj.netAmount += (bill.total/1000)
            }
        })
        obj.netAmount = obj.netAmount.toFixed(2)
        return obj
    })

    return billsData
}

export const getLast7DaysBills = (data) => {
    data.reverse()
    const billsLength = data.length
    const result = []
    if(billsLength > 7){
        for(let i = 0; i < 7; i++){
            result.push(data[i])            
        }
    }
    else{
        for(let i = 0; i <= billsLength - 1; i++){
            result.push(data[i])
        }
    }
    return result
}