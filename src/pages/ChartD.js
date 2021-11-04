import React, { useState, useEffect } from 'react'
import LightningChart from './LightningChart'
import { handleXData } from '../utils'

import './ChartD.css';


const ChartD = props => {
    const { data } = props
    const [chartData, setChartData] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (data) {
            const [X, Y] = handleXData(data, 1000);
            const cData = X.map((value, index) => ({ x: value, y: Y[index] }));
            setCount(count + 1)
            setChartData(cData);
        }
    }, [data])


    return (
        <div className="char-container">
            <div>{count}</div>
            <LightningChart
                id="chart-demo"
                data={chartData}
            />
        </div>
    )
}

export default ChartD