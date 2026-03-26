import { Store, HandCoins, Package, Handshake, Eye, MoreHorizontal, DollarSign, Archive, Bell,Plus,TrendingUp, CalendarDays, Coins, Hash, Settings, User, BarChart3, CirclePlus} from "lucide-react"
import MetricsCard from "../analytics/MetricsCard"
import LowStockCard from "./lowStockCard"
import SearchBar from "../search"

export default function Dashboard() {


  const topProducts = [
    {
      name: "Gold tea glasses",
      category: "Glassware",
      sales: 156,
      revenue: "12,450 DH",
      growth: "+18%",
      image: "/gold-tea-glass.png",
    },
    {
      name: "White ceramic plates",
      category: "Dinnerware",
      sales: 134,
      revenue: "8,920 DH",
      growth: "+12%",
      image: "/white-ceramic-plate.png",
    },
    {
      name: "Stainless steel cutlery",
      category: "Cutlery",
      sales: 98,
      revenue: "340 DH",
      growth: "+8%",
      image: "/stainless-steel-cutlery.png",
    },
    {
      name: "Coffee cups set",
      category: "Drinkware",
      sales: 87,
      revenue: "5,220 DH",
      growth: "+15%",
      image: "/various-coffee-cups.png",
    },
     {
      name: "Coffee cups set",
      category: "Drinkware",
      sales: 87,
      revenue: "5,220 DH",
      growth: "+15%",
      image: "/various-coffee-cups.png",
    },
  ]

  const quickActions = [
    {
      title: "Add product",
      description: "New product to catalog",
      icon: Plus,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Edit price",
      description: "Update pricing",
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Manage stock",
      description: "Inventory and restocking",
      icon: Package,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "View notifications",
      description: "Alerts and messages",
      icon: Bell,
      color: "bg-red-50 text-red-600",
    },
   
  ]
  const recentOrders = [
    {
      id: "4772827",
      customer: "Grill vibe restaurant",
      items: "X25 Gold tea glasses",
      date: "24 Jun 2024, 9:23 pm",
      status: "In progress",
      total: "4,361 DH",
      paymentStatus: "Success",
      paymentMethod: "Credit Card",
      fulfillment: "Fulfilled",
      tracking: "TZ999AA1012345678",
    },
    {
      id: "5839201",
      customer: "Café Central",
      items: "X15 White ceramic plates",
      date: "23 Jun 2024, 2:15 pm",
      status: "Completed",
      total: "2,890 DH",
      paymentStatus: "Success",
      paymentMethod: "Bank Transfer",
      fulfillment: "Fulfilled",
      tracking: "TZ888BB2023456789",
    },
    {
      id: "6273845",
      customer: "Restaurant Atlas",
      items: "X10 Professional chef knives",
      date: "22 Jun 2024, 11:30 am",
      status: "Pending",
      total: "1,250 DH",
      paymentStatus: "Pending",
      paymentMethod: "Cash on Delivery",
      fulfillment: "Unfulfilled",
      tracking: "-",
    },
    {
      id: "7382910",
      customer: "Bistro Marrakech",
      items: "X30 Stainless steel cutlery",
      date: "21 Jun 2024, 4:45 pm",
      status: "In progress",
      total: "3,750 DH",
      paymentStatus: "Success",
      paymentMethod: "Credit Card",
      fulfillment: "Fulfilled",
      tracking: "TZ777CC3034567890",
    },
    {
      id: "8491763",
      customer: "Bistro Marrakech",
      items: "X120 Stainless steel cutlery",
      date: "21 Jun 2024, 4:45 pm",
      status: "In progress",
      total: "12,750 DH",
      paymentStatus: "Success",
      paymentMethod: "Credit Card",
      fulfillment: "Fulfilled",
      tracking: "TZ777CC3034567890",
    },
  ]
  const kpiData = {
    financial: [
      {
        label: "Chiffre d'affaires total",
        value: "1,245,830 DH",
        change: "+18%",
        trend: "up" as const,
        chartData: [1100, 1150, 1080, 1200, 1180, 1250, 1220, 1300, 1280, 1350, 1320, 1400],
      },
      {
        label: "Marge bénéficiaire moyenne",
        value: "23.5%",
        change: "+2.1%",
        trend: "up" as const,
        chartData: [21, 21.5, 20.8, 22, 21.8, 22.5, 22.2, 23, 22.8, 23.5, 23.2, 23.8],
      },
      {
        label: "Commande moyenne",
        value: "3,420 DH",
        change: "-5%",
        trend: "down" as const,
        chartData: [3600, 3580, 3620, 3550, 3570, 3500, 3520, 3480, 3460, 3420, 3440, 3400],
      },
      {
        label: "Créances en cours",
        value: "89,500 DH",
        change: "En cours",
        trend: "neutral" as const,
        chartData: [95, 92, 88, 90, 87, 89, 91, 88, 90, 89, 87, 89],
      },
    ],
    operational: [
      {
        id:1 ,
        label: "Inventory value",
        value: "69,143 DH",
        change: "+12%",
        trend: "up" as const,
        chartData: [280, 290, 275, 310, 305, 320, 315, 340, 335, 350, 345, 364],
      },
      {
        id:2 ,
        label: "Total revenue",
        value: "21,765 DH",
        change: "+4%",
        trend: "up" as const,
        chartData: [60, 62, 59, 64, 63, 65, 64, 66, 65, 67, 66, 68],
      },
      {
        id:3 ,
        label: "Pending orders",
        value: "20",
        change: "-15%",
        trend: "down" as const,
        chartData: [3.2, 3.0, 3.1, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1],
      },
      {
        id:4,
        label: "New customers",
        value: "4.3/5",
        change: "+0.2",
        trend: "up" as const,
        chartData: [4.0, 4.1, 3.9, 4.2, 4.1, 4.2, 4.1, 4.3, 4.2, 4.3, 4.2, 4.4],
      },
    ],
  }
    return(
        <div className="dashboardBar w-full  h-full overflow-y-scroll  flex flex-col items-start ">
          
            <div className="flex items-center w-full justify-between mb-6">
                     <div className="flex items-center gap-4">
                       <h1 className="text-2xl font-semibold text-[#1D1D1F]">Dashboard</h1>
                       <div className="bg-[#fc7348]/80 contrast-125 text-[#F3F3F3] px-3 py-1 rounded-full text-sm font-medium">156 <span className="font-normal">orders</span></div>
                     </div>
                     <div className="flex items-center gap-3">
                        <SearchBar />
                       <button className="flex items-center gap-2 px-4 py-2 bg-[#fc7348]/80 text-white rounded-lg hover:bg-[#fc7348]/90 contrast-125 cursor-pointer transition-colors">
                         <CirclePlus className="w-4 h-4" />
                         Add product

                       </button>
                     </div>
            </div>
           
            <div className="flex flex-col items-start w-full gap-3">
              <div className="text-xl font-medium text-[#1D1D1F]">Overview</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                          {kpiData.operational.map((kpi, index) => {
                            const icons = [
                              <Store key="store" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
                              <HandCoins key="handCoins" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
                              <Package key="package" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
                              <Handshake key="star" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
                            ]
                            return (
                              <MetricsCard
                                key={kpi.id}
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
            <div className="grid grid-cols-4 items-start  gap-4 w-full mt-6">
               <div className="flex flex-col col-span-3 gap-3 w-full items-start ">
                <div className="w-full flex items-center justify-between">
                 <div className="text-xl font-medium text-[#1D1D1F]">Recent orders</div>
                   <button className="px-3 py-1 text-sm  rounded-md  text-[#1D1D1F]/50 hover:text-[#1D1D1F]/90 transition-all duration-200 cursor-pointer">
                      See all
                 </button>
                </div>
                  <div className="overflow-x-auto w-full bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg">
                  <table className="w-full">
                    <thead className=" border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-normal text-[#1D1D1F]/80 text-sm truncate ">
                          <div className="flex items-center gap-2 ">
                            <Hash className="w-4 h-4" strokeWidth={1.5} />
                            Order ID
                          </div>
                        </th>
                        <th className="text-left py-3 px-4  text-sm font-normal text-[#1D1D1F]/80">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" strokeWidth={1.5} />
                            Customer
                          </div>
                        </th>
                        <th className="text-left py-3 px-4  text-sm font-normal text-[#1D1D1F]/80">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" strokeWidth={1.5} />
                            Items
                          </div>
                        </th>
                        <th className="text-left py-3 px-4  text-sm font-normal text-[#1D1D1F]/80 truncate">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" strokeWidth={1.5} />
                            Order Date
                          </div>
                        </th>
                        <th className="text-left py-3 px-4  text-sm font-normal text-[#1D1D1F]/80">
                          <div className="flex items-center gap-2">
                            <Settings className="w-4 h-4" strokeWidth={1.5} />
                            Status
                          </div>
                        </th>
                        <th className="text-left py-3 px-4  text-sm font-normal text-[#1D1D1F]/80">
                          <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4" strokeWidth={1.5} />
                            Total
                          </div>
                        </th>
                        <th className="text-left py-3 px-4  text-sm font-normal text-[#1D1D1F]/80">
                          <div className="flex items-center gap-2 justify-end">
                            <Settings className="w-4 h-4" strokeWidth={1.5} />
                            Actions
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/70">
                      {recentOrders.map((order, index) => (
                        <tr key={index} className=" transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-medium text-sm text-[#1D1D1F]/80 truncate">{order.id}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-normal text-sm text-[#1D1D1F]/80 truncate hover:text-[#1D1D1F] transition-all duration-200 cursor-pointer">
                              {order.customer}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-normal text-sm text-[#1D1D1F]/80 truncate">{order.items}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[#1D1D1F]/80 text-sm truncate">{order.date}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 max-w-[90px] justify-center  w-full py-0.5 rounded-full text-xs font-medium truncate  ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "In progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium  text-sm text-[#1D1D1F] truncate">{order.total}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end pr-2 gap-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
               </div>
               <div className="flex flex-col  gap-3 w-full items-start h-full text-[#1D1D1F] ">
                <div className="w-full flex items-center justify-between">
                 <div className="text-xl font-medium text-[#1D1D1F]">Low stock</div>
                 <button className="px-3 py-1 text-sm   rounded-md  text-[#1D1D1F]/50 hover:text-[#1D1D1F]/90 transition-all duration-200 cursor-pointer">
                      See all
                 </button>
                </div>
                <div className="w-full  bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] p-2 gap-2 flex flex-col items-start rounded-[12px]">
                    {
                      [0,1,2].map(() => {

                        return <LowStockCard  />
                      }
                      )
                    }
                    <LowStockCard/>
                   
                    <div className="w-full px-3 py-2 text-center bg-[#fc7348]/80 cursor-pointer hover:bg-[#fc7348]/90 transition-all duration-300 text-white rounded-lg">Manage stock</div>
                </div>
               </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full mt-6">
                <div className="flex lg:col-span-3 flex-col w-full gap-3">
                  <div className="flex flex-row items-center justify-between ">
                    <h3 className="text-xl font-medium text-[#1D1D1F]">Best performing products</h3>
                     <button className="px-3 py-1 text-sm   rounded-md  text-[#1D1D1F]/50 hover:text-[#1D1D1F]/90 transition-all duration-200 cursor-pointer">
                      See all
                 </button>
                  </div>   
                    <div className="overflow-x-auto w-full bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg">
                    <table className="w-full "> {/* Add table-fixed */}
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="text-left py-3 px-4 font-normal text-[#1D1D1F]/80 text-sm "> {/* Fixed width */}
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4" strokeWidth={1.5} />
                              Produit
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-normal text-[#1D1D1F]/80 text-sm "> {/* Fixed width */}
                            <div className="flex items-center gap-2">
                              <Archive className="w-4 h-4" strokeWidth={1.5} />
                              Category
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-normal text-[#1D1D1F]/80 text-sm "> {/* Fixed width */}
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                              Sales
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-normal text-[#1D1D1F]/80 text-sm "> {/* Fixed width */}
                            <div className="flex items-center justify-center gap-2">
                              <Coins className="w-4 h-4" strokeWidth={1.5} />
                              Revenue
                            </div>
                          </th>
                          <th className="text-left py-3 px-4 font-normal text-[#1D1D1F]/80 text-sm "> {/* Fixed width */}
                            <div className="flex items-center justify-center gap-2">
                              <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
                              Growth
                            </div>
                          </th>
                          
                          <th className="text-left py-3 px-4 font-normal text-[#1D1D1F]/80 text-sm w-[120px]"> {/* Fixed width */}
                            <div className="flex items-center pl-4 gap-2">
                              <Settings className="w-4 h-4" strokeWidth={1.5} />
                              Actions
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/70">
                        {topProducts.map((product, index) => (
                          <tr key={index} className="transition-colors">
                            <td className="py-3 px-4 "> {/* Same width as header */}
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100">
                                  <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="font-medium text-sm text-[#1D1D1F]/80 truncate">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 ">
                              <span className="font-normal text-sm text-[#1D1D1F]/80 cursor-pointer">
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3 px-4  ">
                              <span className="font-normal flex pr-8 items-center justify-center text-[14px] text-[#1D1D1F]/80 truncate">X{product.sales}</span>
                            </td>
                            <td className="py-3 px-4 flex items-center justify-center ">
                              <div className="flex text-center items-center justify-center max-w-max px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {product.revenue}
                              </div>
                            </td>
                            <td className="py-3 px-4 ">
                              <span className="font-medium text-green-600 flex items-center justify-center text-center">{product.growth}</span>
                            </td>
                           
                            <td className="py-3 px-4 ">
                              <div className="flex items-center justify-end pr-2 gap-2">
                                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                  <Eye className="w-4 h-4" strokeWidth={1.5} />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                  <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              {/* Quick Actions Panel */}
              <div className="flex flex-col items-start gap-3 w-full">
                 <div className="">
                    <h3 className="text-xl font-medium text-[#1D1D1F]">Quick actions</h3>
                  </div>
                <div className="shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] bg-[#FAFAFA] px-1 py-1   rounded-lg w-full">
                 <div className="grid grid-cols-1 gap-1  ">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          className="h-auto px-3 py-[6px] group flex items-center justify-start hover:bg-white transition-all duration-300  hover:shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className={`w-3 h-3 rounded-lg flex items-center justify-center group-hover:text-[#fc7348] text-[#1D1D1F]/60 transition-all duration-300  `}>
                              <action.icon className="w-5 h-5 " />
                            </div>
                            <div className="text-left">
                              <h4 className="text-sm font-medium text-[#1D1D1F]">{action.title}</h4>
                              <p className="text-xs text-[#1D1D1F]/60">{action.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                </div>
              </div>
            </div>
           
         </div>
    )
}