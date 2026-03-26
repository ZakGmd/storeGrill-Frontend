import { useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {

  ShoppingCart,
  Clock,
  Star,
  Download,
  Calendar,
  Target,
  CirclePlus,
  CircleDollarSign,
} from "lucide-react"
import MetricsCard from "./MetricsCard"


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
)

export default function AnalyticsDashboard() {

  const [compareMode, setCompareMode] = useState(false)
      const [isOpen, setIsOpen] = useState(false);
      const [selectedValue, setSelectedValue] = useState("");

  const kpiData = {
    financial: [
      {
        label: "Total revenue",
        value: "1,245,830 DH",
        change: "+18%",
        trend: "up" as const,
        chartData: [1100, 1150, 1080, 1200, 1180, 1250, 1220, 1300, 1280, 1350, 1320, 1400],
      },
      {
        label: "Average profit margin",
        value: "23.5%",
        change: "+2.1%",
        trend: "up" as const,
        chartData: [21, 21.5, 20.8, 22, 21.8, 22.5, 22.2, 23, 22.8, 23.5, 23.2, 23.8],
      },
      {
        label: "Average order",
        value: "3,420 DH",
        change: "-5%",
        trend: "down" as const,
        chartData: [3600, 3580, 3620, 3550, 3570, 3500, 3520, 3480, 3460, 3420, 3440, 3400],
      },
      {
        label: "Outstanding receivables",
        value: "89,500 DH",
        change: "Ongoing",
        trend: "neutral" as const,
        chartData: [95, 92, 88, 90, 87, 89, 91, 88, 90, 89, 87, 89],
      },
    ],
    operational: [
      {
        label: "Number of orders",
        value: "364",
        change: "+12%",
        trend: "up" as const,
        chartData: [280, 290, 275, 310, 305, 320, 315, 340, 335, 350, 345, 364],
      },
      {
        label: "Conversion rate",
        value: "67%",
        change: "+4%",
        trend: "up" as const,
        chartData: [60, 62, 59, 64, 63, 65, 64, 66, 65, 67, 66, 68],
      },
      {
        label: "Average processing time",
        value: "2.3h",
        change: "-15 min",
        trend: "up" as const,
        chartData: [3.2, 3.0, 3.1, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1],
      },
      {
        label: "Satisfaction rate",
        value: "4.3/5",
        change: "+0.2",
        trend: "up" as const,
        chartData: [4.0, 4.1, 3.9, 4.2, 4.1, 4.2, 4.1, 4.3, 4.2, 4.3, 4.2, 4.4],
      },
    ],
  }

  const revenueByCity = [
    { city: "Casablanca", percentage: 45, amount: "560,624 DH", color: "#fc7348" },
    { city: "Rabat", percentage: 30, amount: "373,749 DH", color: "#fc734899" },
    { city: "Marrakech", percentage: 15, amount: "186,875 DH", color: "#fc734866" },
    { city: "Others", percentage: 10, amount: "124,582 DH", color: "#fc734833" },
  ]

  const monthlyRevenue = [
    { month: "Jan", revenue: 890000, target: 850000 },
    { month: "Feb", revenue: 920000, target: 900000 },
    { month: "Mar", revenue: 1050000, target: 950000 },
    { month: "Apr", revenue: 980000, target: 1000000 },
    { month: "May", revenue: 1150000, target: 1100000 },
    { month: "Jun", revenue: 1245830, target: 1200000 },
  ]

 

  const topProducts = [
    { name: "Gold tea glasses", category: "Verrerie", revenue: "89,450 DH", margin: "28%", trend: "+15%" },
    { name: "Ceramic plates", category: "Vaisselle", revenue: "76,230 DH", margin: "22%", trend: "+8%" },
    { name: "Stainless steel cutlery", category: "Couverts", revenue: "65,890 DH", margin: "31%", trend: "+12%" },
    { name: "Glass bottles", category: "Verrerie", revenue: "54,670 DH", margin: "19%", trend: "+5%" },
  ]

  
  const periods = ["7 Days", "30 Days", "3 Months", "6 Months", "Cette année", "Personnalisé"]

  const revenueChartData = {
    labels: monthlyRevenue.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue.map((item) => item.revenue / 1000),
        borderColor: "#fc7348cc",
        backgroundColor: "rgba(252, 115, 72, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Targets",
        data: monthlyRevenue.map((item) => item.target / 1000),
        borderColor: "#fc734866",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
      },
    ],
  }

  const cityRevenueChartData = {
    labels: revenueByCity.map((city) => city.city),
    datasets: [
      {
        data: revenueByCity.map((city) => city.percentage),
        backgroundColor: revenueByCity.map((city) => city.color),
        borderWidth: 0,
      },
    ],
  }

  const productPerformanceChartData = {
    labels: topProducts.map((product) => product.name),
    datasets: [
      {
        label: "Revenus (DH)",
        data: topProducts.map((product) => Number.parseInt(product.revenue.replace(/[^\d]/g, ""))),
        backgroundColor: [
          "rgba(252, 115, 72, 0.8)",
          "rgba(252, 115, 72, 0.7)",
          "rgba(252, 115, 72, 0.5)",
          "rgba(252, 115, 72, 0.4)",
        ],
        borderRadius: 8,
      },
    ],
  }
  const options = [
    "7 jours",
    "15 jours",
    "30 jour"
   
  ];
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6B7280",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
    cutout: "60%",
  }
  const handleOptionClick = (option: string) => {
      setSelectedValue(option);
      setIsOpen(false);
      
      // Create a synthetic event similar to native select onChange
      const syntheticEvent = {
        target: {
          name,
          value: option
        }
      };
     
    };
  return (
    <div className="dashboardBar h-screen w-full overflow-y-scroll ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1D1D1F] mb-2">Analyses & Rapports</h1>
          </div>

          <div className="flex flex-wrap  items-center gap-3">
            {/* Time Period Selector */}
            <div className="flex  items-center  w-[100px] py-2 px-1 justify-center gap-1  rounded-lg bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
              <Calendar className="w-4 h-4 text-[#1D1D1F]/70" />
              <div  className="relative">
              {/* Hidden native select for form submission */}
              <select 
                className="sr-only" 
                aria-hidden="true"
              
                onChange={() => {}}
              >
                <option value="">ok</option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* Custom dropdown trigger */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className=" text-sm  outline-none  cursor-pointer flex gap-1 items-center"
              >
                <span className={selectedValue ? '' : 'text-[#1D1D1F]/70'}>
                  7 jours
                </span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 text-[#1D1D1F]/40 ${isOpen ? 'transform rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {/* Dropdown options */}
              {isOpen && (
                <div className="dropDown absolute z-10 w-[100px]  top-8 -right-[7px] bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]  backdrop-blur-xl rounded-lg  max-h-60 overflow-auto">
                  <ul className="py-1 px-1 flex flex-col gap-1">
                    {options.map((option, idx) => (
                      <li
                        key={idx}
                        className={`px-4 py-1 cursor-pointer hover:opacity-90 flex items-center justify-center text-[14px]  transition-all duration-200 rounded-lg ${
                          selectedValue === option 
                            ? 'bg-white/8 text-[#1D1D1F]   ' 
                            : 'hover:bg-white/5 hover:shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] text-[#1D1D1F] opacity-50'
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
            </div>

            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-3 py-2 text-sm rounded-lg  bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] transition-colors `} >
              Comparer période
            </button>

            {/* Export Options */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                PDF
              </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#fc7348]/80 text-white rounded-lg hover:bg-[#fc7348]/90 contrast-125 cursor-pointer transition-colors">
                 <CirclePlus className="w-4 h-4" />
                 Add product
                </button>
            </div>
          </div>
        </div>
      {/* Executive Summary - KPI Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-medium text-[#1D1D1F] mb-4">Executive Summary</h2>

        {/* Financial Metrics */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#1D1D1F]/70 mb-3">Financial Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.financial.map((kpi, index) => (
              <MetricsCard
                key={index}
                title={kpi.label}
                value={kpi.value}
                change={kpi.change}
                trend={kpi.trend}
                icon={<CircleDollarSign className="w-5 h-5 text-gray-400 min-w-[18px]" strokeWidth={1.5} />}
                chartData={kpi.chartData}
              />
            ))}
          </div>
        </div>

        {/* Operational Metrics */}
        <div>
          <h3 className="text-sm font-medium text-[#1D1D1F]/70 mb-3">Operational Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.operational.map((kpi, index) => {
              const icons = [
                <ShoppingCart key="shoppingCart" className="w-5 h-5 text-gray-400 min-w-[18px]" strokeWidth={1.5} />,
                <Target key="target" className="w-5 h-5 text-gray-400 min-w-[18px]" strokeWidth={1.5} />,
                <Clock key="clock" className="w-5 h-5 text-gray-400 min-w-[18px]" strokeWidth={1.5} />,
                <Star key="star" className="w-5 h-5 text-gray-400 min-w-[18px]" strokeWidth={1.5} />,
              ]
              return (
                <MetricsCard
                  key={index}
                  title={kpi.label}
                  value={kpi.value}
                  change={kpi.change}
                  trend={kpi.trend}
                  icon={icons[index]}
                  chartData={kpi.chartData}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
 
        {/* Revenue Analytics */}
        <div className="lg:col-span-3 max-h-max rounded-lg w-full  ">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium text-[#1D1D1F]">Revenue Analysis</h3>
          </div>
          <div className="w-full grid  lg:grid-cols-3 items-center gap-4  mb-5 ">
            <div className="flex flex-col w-full items-start gap-2">
               <h4 className="text-sm font-medium text-gray-600 ">Monthly Trend</h4>
            <div className="h-64 w-full bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg">
              <Line data={revenueChartData} options={chartOptions} />
            </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-sm font-medium text-[#1D1D1F]/70 ">Distribution by City</h4>
              <div className="h-64 w-full bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg">
              <Doughnut data={cityRevenueChartData} options={doughnutOptions} />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h4 className="text-sm font-medium text-[#1D1D1F]/70 ">Product Performance</h4>
              <div className="h-64 w-full bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] p-2 rounded-lg">
               <Bar
                    data={productPerformanceChartData}
                    options={{
                        ...chartOptions,
                        indexAxis: "y" as const,
                        plugins: {
                        ...chartOptions.plugins,
                        legend: {
                            display: false,
                        },
                        },
                    }}
                />
              </div>
            </div>
          </div>

         
        </div>


      
    </div>
  )
}
