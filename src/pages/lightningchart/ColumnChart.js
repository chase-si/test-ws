import { lightningChart, 
    SolidLine, SolidFill, ColorHEX,
    LegendBoxBuilders
  } from "@arction/lcjs";
  import React, {useRef, useEffect } from "react";
  
  // LightningChart 柱状图
  
  const domId = "column-line";
  
  const Chart = () => {
    const chartRef = useRef(undefined);
  
    // 假数据
    const fakeData = [
        {title: "香蕉", count: 10},
        {title: "苹果", count: 20},
        {title: "橘子", count: 50},
        {title: "葡萄", count: 30},
        {title: "西瓜", count: 40}
    ]
  
    useEffect(() => {
      const chart = lightningChart().ChartXY({ container: domId });
  
      chart
      // 图表标题
      .setTitle("柱状图表")
      .setPadding({
        right: 50
      })
      // 图表背景色
      //.setBackgroundFillStyle(new SolidFill({ color: ColorHEX('#B7E8BD') }))
      //.setSeriesBackgroundFillStyle(new SolidFill({ color: ColorHEX('#FDE6E0') }));
      const gutterWidth = 1;
      const barWidth = 2;
      fakeData.map((item, index) => {
          const x1 = gutterWidth * (index + 1) + barWidth * index;
          const x2 = x1 + barWidth;
          const y1 = 0;
          const y2 = item.count;
         const series = chart
        .addRectangleSeries()
        .setName(item.title)
        .setCursorResultTableFormatter((builder, _, figure) => builder
            .addRow(`${item.title}`)
            .addRow(`${figure.getDimensionsTwoPoints().y2} 个`)
        ).add({x1, x2, y1, y2})
        return series;
      });

  
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