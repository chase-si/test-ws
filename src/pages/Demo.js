import React, { useState, useEffect } from 'react'
import MultipleLineChart from './lightningchart/MultipleLineChart'
import ColumnChart from './lightningchart/ColumnChart'
import PointChart from './lightningchart/PointChart'
import HeatmapChart from './lightningchart/HeatmapChart'


const Demo = () => {
    return <div>
        <h1>多条折线图</h1>
        <MultipleLineChart />
        <h1>散点图</h1>
        <PointChart />
    </div>
}

export default Demo;