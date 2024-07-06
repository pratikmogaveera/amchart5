"use client";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useLayoutEffect } from "react";

const Chart = () => {
    // @ts-nocheck
    useLayoutEffect(() => {
        const root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                layout: root.verticalLayout,
                paddingLeft: 10, // Add padding to the left
                paddingRight: 10, // Add padding to the right
                paddingTop: 10, // Add padding to the top
                paddingBottom: 10,
                maskContent: false,
            })
        );

        const colorSet = am5.ColorSet.new(root, {});

        const data = [
            {
                year: "2020",
                value: 0,
                strokeSettings: {
                    stroke: colorSet.getIndex(0),
                },
                fillSettings: {
                    fill: colorSet.getIndex(0),
                },
                bulletSettings: {
                    fill: colorSet.getIndex(0),
                },
                multiplier: "0X",
                showBullets: false,
                bulletColor: colorSet.getIndex(0),
            },
            {
                year: "2022",
                value: 1.1,
                strokeSettings: {
                    stroke: colorSet.getIndex(0),
                },
                fillSettings: {
                    fill: colorSet.getIndex(0),
                },
                bulletSettings: {
                    fill: colorSet.getIndex(0),
                },
                multiplier: "0X",
                showBullets: false,
                bulletColor: colorSet.getIndex(0),
            },
            {
                year: "2024",
                value: 2.34,
                strokeSettings: {
                    stroke: colorSet.getIndex(3),
                },
                fillSettings: {
                    fill: colorSet.getIndex(3),
                },
                bulletSettings: {
                    fill: colorSet.getIndex(0),
                },
                multiplier: "1X",
                showBullets: true,
                bulletColor: colorSet.getIndex(0),
            },
            {
                year: "2027",
                value: 8.41,
                strokeSettings: {
                    stroke: colorSet.getIndex(6),
                },
                fillSettings: {
                    fill: colorSet.getIndex(6),
                },
                bulletSettings: {
                    fill: colorSet.getIndex(3),
                },
                multiplier: "2X",
                showBullets: true,
                bulletColor: colorSet.getIndex(3),
            },
            {
                year: "2032",
                value: 12.84,
                strokeSettings: {
                    stroke: colorSet.getIndex(9),
                },
                fillSettings: {
                    fill: colorSet.getIndex(9),
                },
                bulletSettings: {
                    fill: colorSet.getIndex(6),
                },
                multiplier: "3X",
                showBullets: true,
                bulletColor: colorSet.getIndex(6),
            },
        ];

        const xRenderer = am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 50,
        });

        xRenderer.grid.template.adapters.add("visible", function (visible, target) {
            return target.dataItem.index === 1;
        });

        xRenderer.grid.template.set("location", 0.1);
        xRenderer.labels.template.setAll({
            location: 0,
            multiLocation: 0.0,
            fill: am5.color("#b7b7b7"),
        });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "year",
                renderer: xRenderer,
            })
        );

        xAxis.data.setAll(data);

        const yRenderer = am5xy.AxisRendererY.new(root, {});
        yRenderer.grid.template.set("location", 0.1);
        yRenderer.labels.template.setAll({
            fill: am5.color("#b7b7b7"),
            paddingTop: 10
        });

        yRenderer.grid.template.adapters.add("visible", function (visible, target) {
            return target.dataItem.index === 1;
        });

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxPrecision: 0,
                renderer: yRenderer,
            })
        );

        const series = chart.series.push(
            am5xy.SmoothedXLineSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "year",
                // tension: 0.01,
                marginTop: 10,
                maskBullets: false,
            })
        );

        series.strokes.template.setAll({
            templateField: "strokeSettings",
            strokeWidth: 3,
        });

        series.fills.template.setAll({
            visible: true,
            fillOpacity: 0.3,
            templateField: "fillSettings",
        });

        series.bullets.push(function (root, series, dataItem) {
            if (dataItem.dataContext.showBullets === true) {
                return am5.Bullet.new(root, {
                    sprite: am5.Circle.new(root, {
                        templateField: "bulletSettings",
                        radius: 5,
                    }),
                });
            }
        });

        series.bullets.push(function (root, series, dataItem) {
            if (dataItem.dataContext.showBullets === true) {
                return am5.Bullet.new(root, {
                    sprite: am5.Rectangle.new(root, {
                        templateField: "bulletSettings",
                        rotation: 45,
                        width: 10,
                        height: 10,
                        dy: -18,
                    }),
                });
            }
        });

        series.bullets.push(function (root, series, dataItem) {
            if (dataItem.dataContext.showBullets === true) {
                return am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        text: `${dataItem.dataContext.multiplier}: ${dataItem.get(
                            "valueY"
                        )} L`,
                        fill: am5.color("#fff"),
                        centerX: am5.percent(50),
                        centerY: am5.percent(50),
                        fontSize: 11,
                        fontWeight: "800",
                        paddingBottom: 5,
                        paddingTop: 5,
                        paddingLeft: 7,
                        paddingRight: 7,
                        background: am5.RoundedRectangle.new(root, {
                            fill: dataItem.dataContext.bulletColor,
                            fillOpacity: 1,
                            cornerRadiusTL: 20,
                            cornerRadiusBL: 20,
                            cornerRadiusTR: 20,
                            cornerRadiusBR: 20,
                        }),
                        dy: -22,
                    }),
                });
            }
        });

        series.data.setAll(data);
        series.appear(1000);

        chart.appear(1000, 50);

        return () => {
            root.dispose();
        };
    }, []);

    return <div id="chartdiv" className="w-full h-full"></div>;
};

export default Chart;
