import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const Pie = ({ currentQuestion, showRespInPercen }) => {
  const [designTemplate, setDesignTemplate] = useState(
    currentQuestion?.designTemplate || ""
  );
  const [localQuestion, setLocalQuestion] = useState(
    currentQuestion?.question || ""
  );
  const [localOptions, setLocalOptions] = useState(
    currentQuestion?.options || []
  );

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const timeoutRef = useRef(null); // for debounce

  useEffect(() => {
    if (currentQuestion) {
      setDesignTemplate(currentQuestion.designTemplate || "");
      setLocalQuestion(currentQuestion.question || "");
      setLocalOptions(currentQuestion.options || []);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!localOptions.length) return;

    // Clear previous timeout if updating rapidly
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");
      const allZero = localOptions.every((opt) => opt.votes === 0);

      chartInstance.current = new Chart(ctx, {
        type: "pie", // donut chart
        data: {
          labels: localOptions.map((opt) => opt.text),
          datasets: [
            {
              data: allZero
                ? localOptions.map(() => 1)
                : localOptions.map((opt) => opt.votes),
              backgroundColor: allZero
                ? localOptions.map(() => "rgba(0,0,0,0.20)")
                : localOptions.map((opt) => opt.color),
              borderWidth: 1,
            },
          ],
        },
        options: {
          cutout: "0%", // donut hole
          responsive: true,
          animation: { animateScale: true, animateRotate: true },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw;
                  if (showRespInPercen && !allZero) {
                    const total = localOptions.reduce(
                      (sum, o) => sum + o.votes,
                      0
                    );
                    const percent = total ? ((value / total) * 100).toFixed(1) : 0;
                    return `${context.label}: ${percent}%`;
                  }
                  return `${context.label}: ${value}`;
                },
              },
            },
          },
        },
      });
    }, 1000); // 1-second debounce

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [localOptions, showRespInPercen]);

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-full w-full text-gray-500 font-Outfit">
        <div className="h-10 w-10 border-3 animate-spin border-stone-300 border-t-black rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="h-[500px] flex-1 flex flex-col justify-center transition-all ease-in-out duration-300">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div
          className={`w-[76%] h-full bg-cover bg-center bg-no-repeat ${designTemplate}`}
        >
          {/* Question */}
          <div className="w-full h-[10%] text-black font-Outfit text-2xl pt-7 pl-7">
            <h1>Q) {localQuestion}</h1>
          </div>

          {/* Chart + legend */}
          <div className="w-full h-[90%] flex flex-col md:flex-row justify-center items-center gap-20 p-6">
            {/* Donut Chart */}
            <div className="w-[300px] h-[300px]">
              <canvas ref={chartRef} />
            </div>

            {/* Custom Legend */}
            <div className="flex flex-col gap-4">
              {localOptions.map((opt) => (
                <div key={opt._id} className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: opt.color }}
                  ></span>
                  <p className="text-lg font-medium font-Outfit text-gray-800">
                    {opt.text} : {opt.votes}
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
