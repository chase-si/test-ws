import { lightningChart, PointShape, SolidFill, ColorHEX, AutoCursorModes } from "@arction/lcjs";
import React, { useRef, useEffect } from "react";

// LightningChart 散点图

const domId = "point-line";

const Chart = () => {
  const chartRef = useRef(undefined);

  useEffect(() => {
    const chart = lightningChart()
      .ChartXY({ container: domId })
      .setTitle("散点图表")

    const pointSeries = chart
      .addPointSeries({ pointShape: PointShape.Circle })
      .setPointSize(3)
      .setName("Scatter series")
      .setPointFillStyle(new SolidFill({ color: ColorHEX('#FFA500') }))
      pointSeries.solveNearestFromScreen({x: 0, y: 0})

    fetch(document.head.baseURI + "/fakePointChartData.json")
      .then((r) => r.json())
      .then((data) => {
        const { scatterPoints } = data;
        // Add data to series.
        pointSeries.add(scatterPoints);
      });

    chartRef.current = { chart };

    return () => {
      console.log("destroy chart");
      chart.dispose();
      chartRef.current = undefined;
    };
  });

  return <div id={domId} style={{ height: 400 }}></div>;
};

export default Chart;
