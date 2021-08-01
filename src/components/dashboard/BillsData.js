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
                <div className="col-8  my-2 animate__animated animate__zoomIn" style={{boxShadow:"0px 0px 4px #333", backgroundColor:"whitesmoke", borderRadius:"8px"}}>
                    <h3 className="text-center text-info my-2 py-2">Sales analysis of last 7 days (amount in thousands)</h3>
                    <BarChart width={800} height={350} data={billsData}
                    >        
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" stroke="#8884d8" />
                        <YAxis ticks={[25, 50, 75, 100, 125, 150, 175, 200]} />
                        <Tooltip />
                        <Bar dataKey="netAmount" fill="green" barSize={25} />
                    </BarChart>
                </div> : null
            }
        </>
    )
}

export default BillsData