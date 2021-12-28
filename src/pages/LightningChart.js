import { 
  lightningChart, 
  AxisTickStrategies,
  AutoCursorModes, 
  MarkerBuilders,
  UIBackgrounds,
  UIOrigins,
  UIDirections,
  translatePoint  
} 
from '@arction/lcjs'
import React, { useRef, useEffect, useState } from 'react'

// https://www.arction.com/lightningchart-js-api-documentation/v3.2.0/classes/chartxy.html#addlineseries

const formatX = (val) => `${(val / 1e6).toFixed(2)} MHz`;

// 节流函数
const throttle = (cb, wait=300) => {
  let last = 0;
    return function(){
        const now = new Date().getTime();;
        if (now - last > wait) {
            cb.apply(this, arguments);
            last = new Date().getTime();;
        }
    }
}

// 自定义marker
const SeriesMarkerBuilder = MarkerBuilders.XY
    .setPointMarker(UIBackgrounds.Circle)
    .setResultTableBackground(UIBackgrounds.Pointer)
    .addStyler(marker => marker
      .setPointMarker(point => point.setSize({ x: 5, y: 5 })
    )
        .setResultTable(table => table
            .setOrigin(UIOrigins.CenterBottom)
            .setMargin({ bottom: 0 })
            .setBackground(arrow => arrow
                .setDirection(UIDirections.Down)
                .setPointerAngle(80)
                .setPointerLength(20)
            )
        )
        .setAutoFitStrategy(undefined)
    )

const LightningChart = (props) => {
  const { data, id } = props
  const chartRef = useRef(undefined)
  const xValue = useRef(0)

  useEffect(() => {
    // Create chart, series and any other static components.
    // NOTE: console log is used to make sure that chart is only created once, even if data is changed!
    console.log('create chart')
    const chart = lightningChart().ChartXY({ container: id })
    .setAutoCursorMode(AutoCursorModes.disabled)
    // chart.onSeriesBackgroundMouseClick((_, event) => {
    //   const mouseLocationEngine = chart.engine.clientLocation2Engine(event.clientX, event.clientY)
    //   const mouseLocationAxisX = translatePoint(mouseLocationEngine, chart.engine.scale, { x: chart.getDefaultAxisX(), y: chart.getDefaultAxisY() }).x
    //   console.log("@@@@@", mouseLocationAxisX)
    //   //marker.setPosition({x: xValue})
    //   xValue.current = parseInt(mouseLocationAxisX)
    // })
    

    const series = chart.addLineSeries()
    // series.onMouseClick(params => {
    //   console.log("---", params)
    // })
    series.setCursorResultTableFormatter((tableBuilder, series, x, y, dataPoint) => {
      return tableBuilder.addRow(`X: ${formatX(x)}`).addRow(`Y:${y}`)
    })
    const marker = series.addMarker(SeriesMarkerBuilder)

    const axisX = chart.getDefaultAxisX();
    //axisX.setTickStrategy(AxisTickStrategies.Empty);
    axisX.setTickStrategy(AxisTickStrategies.Numeric, strategy =>
      strategy
      .setMajorFormattingFunction((tickPosition) => formatX(tickPosition))
      .setMinorFormattingFunction((tickPosition) => formatX(tickPosition))
    );
    axisX.onAxisInteractionAreaMouseMove(throttle(
      (_, event) => {
        const mouseLocationEngine = chart.engine.clientLocation2Engine(event.clientX, event.clientY)
        const mouseLocationAxisX = translatePoint(mouseLocationEngine, chart.engine.scale, { x: chart.getDefaultAxisX(), y: chart.getDefaultAxisY() }).x
        xValue.current = mouseLocationAxisX
        marker.setPosition({x: mouseLocationAxisX})
      }
    ))
    
    
    // Store references to chart components.
    chartRef.current = { chart, series, axisX, marker }

    // Return function that will destroy the chart when component is unmounted.
    return () => {
      // Destroy chart.
      console.log('destroy chart')
      chart.dispose()
      chartRef.current = undefined
    }
  }, [id])

  useEffect(() => {
    if (data) {
      const components = chartRef.current
      if (!components) return

      // Set chart data.
      const { series, marker } = components
      series.clear().add(data);
      if(xValue.current >= 0){
        setTimeout(()=> {
          marker.setPosition({x: xValue.current})
        }, 10)
      }
    }
  }, [data, chartRef])

  return <div id={id} className='lightning-chart'></div>
}

export default LightningChart
