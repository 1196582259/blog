"use client";

import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ToolboxComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

import { type TaskCountData } from "@/app/lib/data";

interface ArticleCountChartProps {
  data: TaskCountData[];
}

export default function ArticleCountChart({ data }: ArticleCountChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: "文章数量统计",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.date),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data.map((item) => item.count),
          type: "line",
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}
