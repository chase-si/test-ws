import { lightningChart, AxisTickStrategies, UIElementBuilders } from '@arction/lcjs'
import React, { useRef, useEffect } from 'react'

// https://www.arction.com/lightningchart-js-api-documentation/v3.2.0/classes/chartxy.html#addlineseries

const formatX = (val) => `${(val / 1e6).toFixed(2)} MHz`;


const LightningChart = (props) => {
  const { data, id } = props
  const chartRef = useRef(undefined)

  useEffect(() => {
    // Create chart, series and any other static components.
    // NOTE: console log is used to make sure that chart is only created once, even if data is changed!
    console.log('create chart')
    const chart = lightningChart().ChartXY({ container: id });

    const axisX = chart.getDefaultAxisX();
    //axisX.setTickStrategy(AxisTickStrategies.Empty);
    axisX.setTickStrategy(AxisTickStrategies.Numeric, strategy =>
      strategy
      .setMajorFormattingFunction((tickPosition) => formatX(tickPosition))
      .setMinorFormattingFunction((tickPosition) => formatX(tickPosition))
    );

    const series = chart.addLineSeries()
    // Store references to chart components.
    chartRef.current = { chart, series, axisX }

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
      const { series } = components

      series.clear().add(data);
      
      // const step = data.length / 10 ;
      // for(let i = 0; i < data.length ; i=i+step){
      //   axisX.addCustomTick(UIElementBuilders.AxisTick)
      //       .setValue(data[i].x)
      //       .setTextFormatter(() => formatX(data[i].x)); 
      // }
    }
  }, [data, chartRef])

  return <div id={id} className='lightning-chart'></div>
}

export default LightningChart
