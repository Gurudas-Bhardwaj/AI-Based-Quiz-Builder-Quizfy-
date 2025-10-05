import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const DonutType = ({ currentQuestion, showRespInPercen }) => {
  const [designTemplate, setDesignTemplate] = useState(currentQuestion?.designTemplate || "");
  const [localQuestion, setLocalQuestion] = useState(currentQuestion?.question || "");
  const [localOptions, setLocalOptions] = useState(currentQuestion?.options || []);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const timeoutRef = useRef(null); // for debouncing

  useEffect(() => {
    if (currentQuestion) {
      setDesignTemplate(currentQuestion.designTemplate || "");
      setLocalQuestion(currentQuestion.question || "");
      setLocalOptions(currentQuestion.options || []);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!localOptions.length) return;

    // debounce updates to avoid frequent re-renders
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");
      const allZero = localOptions.every((opt) => opt.votes === 0);

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
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
              borderWidth: 2,
            },
          ],
        },
        options: {
          cutout: "50%",
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 500, // smooth transition
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw;
                  if (showRespInPercen && !allZero) {
                    const total = localOptions.reduce((sum, o) => sum + o.votes, 0);
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
    <div className="h-full flex-1 flex flex-col justify-center transition-all ease-in-out duration-300">
      <div className="w-full h-full mt-6 flex flex-col justify-center items-center">
        <div className={`w-full h-full bg-cover bg-center  bg-no-repeat ${designTemplate}`}>
          {/* Question */}
          <div className="w-full h-[10%] text-black font-Outfit text-2xl pt-7 pl-7">
            <h1>Q) {localQuestion}</h1>
          </div>

          {/* Donut + Legend */}
          <div className="w-full h-[90%] flex flex-col md:flex-row justify-center items-center gap-24 p-6">
            <div className="w-[300px] h-[300px]">
              <canvas ref={chartRef} />
            </div>
            <div className="flex flex-col gap-4">
              {localOptions.map((opt) => {
                const totalVotes = localOptions.reduce((sum, o) => sum + o.votes, 0);
                const percent = totalVotes ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0;
                return (
                  <div key={opt._id} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full" style={{ backgroundColor: opt.color }}></span>
                    <p className="text-lg font-Outfit font-medium text-gray-800">
                      {opt.text} : {opt.votes} {showRespInPercen ? `(${percent}%)` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutType;
