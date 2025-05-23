import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const BarCharts = ({ title }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "React", "React Native", "Vue", "React", "React Native"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70, 10, 40, 70],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }, [title]);

  return <div ref={chartRef} style={{ width: "500px", height: "400px" }}></div>;
};

export default BarCharts;
