import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const Donut = ({ designTemplate, localOptions, localQuestion }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // destroy old chart before redraw
    }

    const ctx = chartRef.current.getContext("2d");

    // Check if all votes are 0
    const allZero = localOptions.every((opt) => opt.votes === 0);

    chartInstance.current = new Chart(ctx, {
      type: "doughnut", // <-- changed to doughnut for donut chart
      data: {
        labels: localOptions.map((opt) => opt.text),
        datasets: [
          {
            data: allZero
              ? localOptions.map(() => 1) // equal slices when no votes
              : localOptions.map((opt) => opt.votes),
            backgroundColor: allZero
              ? localOptions.map(() => "rgba(0,0,0,0.20)") // default transparent shade
              : localOptions.map((opt) => opt.color),
            borderWidth: 1,
          },
        ],
      },
      options: {
        cutout: "50%", // <-- creates the hole in the middle
        responsive: true,
        plugins: {
          legend: { display: false }, // keep your custom legend
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [localOptions]);

  return (
    <div className="h-[550px] flex-1 pr-2 pl-2 flex flex-col justify-center transition-all ease-in-out duration-300">
      <div className="w-full h-full mt-6 flex flex-col justify-center items-center">
        <div
          className={`w-full h-full bg-cover bg-center bg-no-repeat ${designTemplate}`}
        >
          {/* Question */}
          <div className="w-full h-[10%] text-black font-Outfit text-2xl pt-7 pl-7">
            <h1>Q) {localQuestion}</h1>
          </div>

          {/* Donut chart with legend */}
          <div className="w-full h-[90%] flex flex-col md:flex-row justify-center items-center gap-10 p-6">
            {/* Donut chart */}
            <div className="w-[80%] sm:w-[60%] md:w-[300px] h-[70%] sm:h-[250px] md:h-[300px]">
              <canvas ref={chartRef} />
            </div>

            {/* Custom legend */}
            <div className="grid grid-cols-2 grid-rows-2 md:flex md: md:flex-row gap-4 sm:gap-6 items-start sm:items-center  sm:mt-0">
              {localOptions.map((opt) => (
                <div
                  key={opt._id}
                  className="flex items-center gap-3 flex-wrap justify-center"
                >
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

export default Donut;
