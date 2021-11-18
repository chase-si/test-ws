import {
    lightningChart, LUT, ColorHSV, PalettedFill,
    AxisScrollStrategies, AxisTickStrategies, LegendBoxBuilders
} from "@arction/lcjs";
import React, { useRef, useEffect } from "react";

// LightningChart 热力图表
const formatX = (val) => `${(val / 1e6).toFixed(2)} MHz`;

const lut = new LUT({
    steps: [
        { value: 0, label: "0", color: ColorHSV(0, 1, 0) },
        { value: 15, label: "15", color: ColorHSV(270, 0.84, 0.2) },
        { value: 30, label: "30", color: ColorHSV(289, 0.86, 0.35) },
        { value: 45, label: "45", color: ColorHSV(324, 0.97, 0.56) },
        { value: 60, label: "60", color: ColorHSV(1, 1, 1) },
        { value: 75, label: "75", color: ColorHSV(44, 0.64, 1) },
    ],
    units: "dB",
    interpolate: true,
});

const paletteFill = new PalettedFill({ lut, lookUpProperty: "value" });

const Chart = props => {
    const { id, data } = props
    const chartRef = useRef(undefined);

    useEffect(() => {
        const chart = lightningChart().ChartXY({ container: id })
        chart.setTitle("瀑布图表").setPadding({ right: 16, bottom: 60 })

        // 配置横坐标
        const xAxis = chart.getDefaultAxisX()
        xAxis.setTickStrategy(AxisTickStrategies.Numeric, strategy =>
            strategy
                .setMajorFormattingFunction((tickPosition) => formatX(tickPosition))
                .setMinorFormattingFunction((tickPosition) => formatX(tickPosition))
        ).setInterval(10e6, 35e6, false, true)

        // 配置纵坐标
        const yAxis = chart.getDefaultAxisY()
        yAxis.setScrollStrategy(AxisScrollStrategies.progressive)
            .setInterval(0, 1000000)
            .setTickStrategy(AxisTickStrategies.Time);

        const seriesOptions = {
            scrollDimension: "rows",
            resolution: 1000,
            start: { x: 10e6, y: 0 },
            step: { x: 25e3, y: 1000 },
        }

        const series = chart
            .addHeatmapScrollingGridSeries(seriesOptions)
            .setFillStyle(paletteFill)

        // 配置图例
        const legend = chart
            .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
            .add(chart)

        chartRef.current = { chart, series };

        return () => {
            console.log("destroy chart");
            chart.dispose();
            chartRef.current = undefined;
        };
    }, [id]);


    useEffect(() => {
        if (data && data.length > 0) {
            const { series } = chartRef.current
            series.addIntensityValues([data]);
        }
    }, [data])

    return <div id={id} style={{ height: 400 }}></div>;
};

export default Chart;
