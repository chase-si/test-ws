import React, { useEffect, useMemo, useRef } from 'react'
import ReactECharts from 'echarts-for-react'

import { handleXData } from '../utils'

const OPTION = {
    title: { text: '1000个点折线图', right: 0 },
    grid: {
        top: 8, right: 8, bottom: 80, left: 36
    },
    animation: false,
    xAxis: {
        type: 'category',
        axisLabel: { formatter: (val) => `${(val / 1e6).toFixed(2)} MHz` }
    },
    yAxis: { type: 'value' },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
    }, {
        type: 'slider'
    }],
    series: [{
        large: true,
        type: 'line',
        legendHoverLink: false
    }]
}

const ChartC = props => {
    const { data } = props
    const chartDom = useRef(null)

    useEffect(() => {
        if (data) {
            console.time()
            handleSetOption(data)
        }
    }, [data])

    const handleSetOption = (data) => {
        const ec = chartDom.current.getEchartsInstance()
        const [X, Y] = handleXData(data, 1000)
        console.log(X)
        ec.setOption({
            xAxis: {
                data: X
            },
            series: [{ data: Y }]
        }, [], true)
    }

    const renderReactChartOnce = useMemo(() => {
        return (
            <ReactECharts
                ref={chartDom}
                option={OPTION}
                lazyUpdate
                onEvents={{
                    'rendered': () => console.timeEnd(),
                    'finished': () => console.timeEnd(),
                }}
            />
        )
    }, [])
    

    return (
        <div>
            {renderReactChartOnce}
        </div>
    )
}

export default ChartC