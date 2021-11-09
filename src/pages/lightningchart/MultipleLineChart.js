import { lightningChart, 
  SolidLine, SolidFill, ColorHEX,
  LegendBoxBuilders
} from "@arction/lcjs";
import React, { useState, useRef, useEffect } from "react";

// LightningChart 多条折线图表

const domId = "multiple-line";

const createFakeLine = count => {
  const line = [];
  for(let i = 0; i < count; i++){
    line.push({x: i, y : Math.random() * count});
  }
  return line;
}

const Chart = () => {
  const chartRef = useRef(undefined);

  // 假数据
  const line1 = createFakeLine(10);
  const line2 = createFakeLine(10);
  const line3 = createFakeLine(10);
  const line4 = createFakeLine(10);

  useEffect(() => {
    const chart = lightningChart().ChartXY({ container: domId });

    chart
    // 图表标题
    .setTitle("图表标题")
    .setPadding({
      right: 50
    })
    // 图表背景色
    //.setBackgroundFillStyle(new SolidFill({ color: ColorHEX('#B7E8BD') }))
    //.setSeriesBackgroundFillStyle(new SolidFill({ color: ColorHEX('#FDE6E0') }));


    const lineSeries1 = chart.addLineSeries().setName('折线1')
    // 自定义样式 
    .setStrokeStyle(new SolidLine({ 
      thickness: 2, 
      fillStyle: new SolidFill({ color: ColorHEX('#F00') }) 
    }));
    const lineSeries2 = chart.addLineSeries().setName('折线2');
    const lineSeries3 = chart.addLineSeries().setName('折线3');

    lineSeries1.add(line1);
    lineSeries2.add(line2);
    lineSeries3.add(line3);

    const legend = chart
    .addLegendBox(LegendBoxBuilders.HorizontalLegendBox);

    legend.add(chart);


    const axisX = chart.getDefaultAxisX();
    axisX.onScaleChange((start, end) => {
      console.log(`start value: ${start}, end value : ${end}`);
    });

    chartRef.current = { chart };

    return () => {
      console.log("destroy chart");
      chart.dispose();
      chartRef.current = undefined;
    };
  });

  return <div id={domId} style={{height: 400}}></div>;
};

export default Chart;