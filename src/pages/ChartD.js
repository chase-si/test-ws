import React, { useState, useEffect } from 'react'
import LightningChart from './LightningChart'
import HeatmapChart from './lightningchart/HeatmapChart'
import { handleXData } from '../utils'

import './ChartD.css';


const ChartD = props => {
    const { data } = props
    const [chartData, setChartData] = useState([])
    const [heatmapData, setHeatmapData] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (data) {
            const [X, Y] = handleXData(data, 1000);
            const cData = X.map((value, index) => ({ x: value, y: Y[index] }));
            console.log("data", cData[1])
            setCount(count + 1)
            setChartData(cData);
            setHeatmapData(Y)
        }
    }, [data])


    return (
        <div className="char-container">
            <div>{count}</div>
            <LightningChart
                id="chart-demo"
                data={chartData}
            />
            <HeatmapChart
                id="heatmap-demo"
                data={heatmapData}
            />
        </div>
    )
}

export default ChartD