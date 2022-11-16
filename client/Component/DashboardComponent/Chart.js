import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';

export default function ChartDevices({data}) {
    const label = (data || []).map((item)=>item?.name)
    const dataNumber = (data || []).map((item)=>item?.pc)
    const dataChart = {
        labels: label,
        datasets: [
          {
            data: dataNumber,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderWidth: 2,
          }
        ]
      };
  return <Doughnut style={{width:340, height: 380}} data={dataChart} />;
}