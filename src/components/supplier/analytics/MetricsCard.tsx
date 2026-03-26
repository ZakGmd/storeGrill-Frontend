import { Line } from "react-chartjs-2"
import { TrendingUp, TrendingDown } from "lucide-react"
import {  useRef } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

interface MetricsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon?: React.ReactNode
  chartData?: number[]
}

export default function MetricsCard({ title, value, change, trend, icon, chartData }: MetricsCardProps) {
  // Remove the manual ref - let react-chartjs-2 handle it
  const chartId = useRef(`chart-${Math.random().toString(36).substr(2, 9)}`)
  
  const defaultChartData = chartData || [20, 25, 22, 30, 28, 35, 32, 40, 38, 45, 42, 48]

  const trendChartData = {
    labels: Array.from({ length: defaultChartData.length }, (_, i) => i.toString()),
    datasets: [
      {
        data: defaultChartData,
        backgroundColor: "rgba(252, 115, 72, 0.1)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0.4,
        borderColor: '#fc7348',
        pointHoverBorderWidth: 2,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
        border: { color: 'rgba(0,0,0,0.06)' },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        border: { color: 'rgba(0,0,0,0.06)' },
      },
    },
    elements: {
      point: { radius: 0 },
    },
    interaction: {
      intersect: false,
    },
  }
 
  return (
    <div className="rounded-lg px-3 py-2 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-400">{icon}</div>}
          <h3 className="text-[16px] text-gray-400 font-normal tracking-[-0.12px]">{title}</h3>
        </div>
        <div className="flex items-end justify-between">
          <div className="inline-flex items-start gap-2">
            <div className="text-xl font-semibold text-gray-900 mb-2">{value}</div>
            <div className={`flex items-center mt-[4px] max-w-max px-2 py-1 gap-1 border border-[#1D1D1F]/7 rounded-full 
              ${trend === "up" ? "bg-green-100 text-green-800" : trend === "down" ? "bg-red-100 text-red-800" : ""}`}>
              {trend === "up" && <TrendingUp className="w-3 h-3 text-green-800" />}
              {trend === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
              <span className={`text-sm leading-2 font-medium ${
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div className="w-20 h-12">
            {/* Use key to force new instances and remove manual ref */}
            <Line 
              key={chartId.current} 
              data={trendChartData} 
              options={chartOptions} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}