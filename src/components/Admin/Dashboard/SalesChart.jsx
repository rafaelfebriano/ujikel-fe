import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function SalesChart({ labels, data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;

    const myChart = new Chart(ctx, {
      type: "bar",

      data: {
        labels: labels,

        datasets: [
          {
            label: "Pemasukan Laundry Minggu Ini",
            data: data,
            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [labels, data]);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h1 className="text-2xl font-black text-slate-800 mb-6">Statistik Penjualan</h1>

      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default SalesChart;
