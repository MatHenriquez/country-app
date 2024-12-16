import { ChartData, ChartOptions, Point } from "chart.js";
import { Line } from "react-chartjs-2";

interface IHistoricalPopulationChartProps {
  chartData: ChartData<"line", (number | Point | null)[]>;
  options: ChartOptions<"line">;
}

const HistoricalPopulationChart = ({
  chartData,
  options,
}: IHistoricalPopulationChartProps) => {
  return (
    <div className="md:mb-8 md:w-2/3">
      <h3 className="text-2xl font-semibold mb-4 text-black">
        Population Over Time
      </h3>
      <div className="w-full h-64 sm:h-80 md:h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HistoricalPopulationChart;
