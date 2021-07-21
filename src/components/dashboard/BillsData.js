import React from 'react'
import { useSelector } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { getLastBillsData, getLast7DaysBills } from '../../selectors/dashboard'

const BillsData = (props) => {
    const bills = useSelector(state => state.bills)

    const result = getLastBillsData(bills)
    const billsData = getLast7DaysBills(result)
    //console.log(billsData)


    return(
        <>
            {bills.length ?
                <div className="col-8  my-2 animate__animated animate__zoomIn" style={{boxShadow:"0px 0px 4px #333", backgroundColor:"whitesmoke"}}>
                    <h3 className="text-center text-info my-2">Sales analysis of last 7 days</h3>
                    <BarChart width={800} height={350} data={billsData}
                            // margin={{
                            //     top: 60,
                            //     right: 30,
                            //     left: 20,
                            //     bottom: 5,
                            // }}
                    >        
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="netAmount" fill="green" barSize={25} />
                    </BarChart>
                </div> : null
            }
        </>
    )
}

export default BillsData