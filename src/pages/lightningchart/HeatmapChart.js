import { lightningChart, LUT, ColorRGBA, PalettedFill, emptyLine, 
    UIElementBuilders, UIOrigins, emptyFill
} from "@arction/lcjs";
import React, { useRef, useEffect } from "react";

// LightningChart 热力图表

const domId = "heatmap-line";

const lut = new LUT({
    interpolate: false,
    steps: [
        { value: 0, color: ColorRGBA(255, 255, 255) },
        { value: 200, color: ColorRGBA(96, 146, 237) },
        { value: 300, color: ColorRGBA(0, 0, 255) },
        { value: 400, color: ColorRGBA(255, 215, 0) },
        { value: 500, color: ColorRGBA(255, 164, 0) },
        { value: 600, color: ColorRGBA(255, 64, 0) },
    ],
})

const fakeDataPromise = new Promise(async resolve => {
    const traceDataArray = await Promise.all(
        new Array(10).fill(0).map(() => 
            new Array(100).fill(0).map(() => (Math.random() * 1000))
        )
    )
    resolve({traceDataArray});
});

const Chart = () => {
  const chartRef = useRef(undefined);

  useEffect(() => {
    const chart = lightningChart()
      .ChartXY({ container: domId })
      .setTitle("热力图表")
      .setPadding({  right: 16, bottom: 60 })

      // 模拟假数据
      fakeDataPromise.then(data => {
        const { traceDataArray } = data
        const heatmapOptions = {
            columns: traceDataArray[0].length,
            rows: traceDataArray.length,
            start: {
                x: 0,
                y: 0,
            },
            step: {
                x: 10,
                y: 10,
            },
            dataOrder: 'rows'
        }
        const heatmapSeries = chart
        .addHeatmapGridSeries(heatmapOptions)
        .setPixelInterpolationMode('disabled')
        .invalidateIntensityValues(traceDataArray)
        .setFillStyle(new PalettedFill({
            lookUpProperty: 'value',
            lut
        }))
        .setWireframeStyle(emptyLine)
        .setCursorResultTableFormatter((builder, series, dataPoint) => builder
            .addRow('Intensity:', '', dataPoint.intensity.toFixed(1))
        )

        const lutRange = chart.addUIElement(UIElementBuilders.LUTRange)
        .setLUT(lut)
        .setLUTLength(500)
        .setPosition({ x: 50, y: 0 })
        .setMargin(20)
        .setOrigin(UIOrigins.CenterBottom)
        .setAutoDispose({
            type: 'max-width',
            maxWidth: 0.8,
        })
        .setBackground(background => background
            .setFillStyle(emptyFill)
            .setStrokeStyle(emptyLine)
        )
      })

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
