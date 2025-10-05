import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const Pie = ({ designTemplate, localOptions, localQuestion }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
    console.log("hello")

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // destroy old chart before redraw
    }

    const ctx = chartRef.current.getContext("2d");

    // Check if all votes are 0
    const allZero = localOptions.every(opt => opt.votes === 0);

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: localOptions.map(opt => opt.text),
        datasets: [
          {
            data: allZero
              ? localOptions.map(() => 1) // equal slices when no votes
              : localOptions.map(opt => opt.votes),
            backgroundColor: allZero
              ? localOptions.map(() => "rgba(0,0,0,0.20)") // default transparent shade
              : localOptions.map(opt => opt.color),
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false } // we'll make our own legend
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [localOptions]);

  return (
    <div className="h-[550px] flex-1 flex flex-col justify-center pl-2 pr-2 transition-all ease-in-out duration-300">
      <div className="w-full h-full flex flex-col justify-center mt-6 items-center">
        <div
          className={`w-full h-full bg-cover bg-center bg-no-repeat ${designTemplate}`}
        >
          {/* Question */}
          <div className="w-full h-[10%] text-black font-Outfit text-2xl pt-7 pl-7">
            <h1>Q) {localQuestion}</h1>
          </div>

          {/* Pie chart with legend */}
          <div className="w-full h-[90%] flex flex-col md:flex-row justify-center items-center gap-20 p-6">
            {/* Pie chart */}
            <div className="w-[300px] h-[300px]">
              <canvas ref={chartRef} />
            </div>

            {/* Custom legend */}
            <div className="flex flex-col gap-4">
              {localOptions.map((opt, index) => (
                <div key={opt._id} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: opt.color }}
                  ></span>
                  <p className="text-lg font-Outfit font-medium text-gray-800">
                    {opt.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pie;
