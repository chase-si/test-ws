import React, { useState, useEffect, useMemo, useRef } from 'react'
import ReactECharts from 'echarts-for-react'

import { handleXData } from '../utils'

const OPTION = {
    title: { text: '11W个点折线图', right: 0 },
    grid: {
        top: 8, right: 8, bottom: 80, left: 36
    },
    animation: false,
    xAxis: {
        type: 'category',
        axisLabel: { formatter: (val) => `${(val / 1e6).toFixed(2)} MHz` }
    },
    yAxis: { type: 'value', max: 100, min: 0 },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
    }, {
        type: 'slider'
    }],
    series: [{
        large: true,
        type: 'scatterGL',
        legendHoverLink: false
    }]
}

const ChartA = props => {
    const { data } = props
    const chartDom = useRef(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (data) {
            // console.time()
            handleSetOption(data)
        }
    }, [data])

    const handleSetOption = (data) => {
        const ec = chartDom.current.getEchartsInstance()
        console.log(data);
        const [X, Y] = handleXData(data)
        setCount(count + 1)
        
        ec.setOption({
            xAxis: {
                data: X
            },
            series: [{ data: Y }]
        }, [], true)
    }

    const renderReactChartOnce = useMemo(() => {
        return (
            // <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            //     <circle cx={x} cy="50" r="20" stroke="black"
            //         stroke-width="2" fill="red"/>
            // </svg>
            <ReactECharts
                ref={chartDom}
                option={OPTION}
                lazyUpdate
                // onEvents={{
                //     'rendered': () => console.timeEnd(),
                //     'finished': () => console.timeEnd(),
                // }}
            />
        )
    }, [])
    

    return (
        <div>
            <div>{count}</div>
            {renderReactChartOnce}
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                {data && data.map((item,index) => (
                    <circle key={index} cx={index} cy={item} r="1" fill="red"/>
                ))}
            </svg> */}
        </div>
    )
}

export default ChartA