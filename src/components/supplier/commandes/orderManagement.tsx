import { useState } from "react"
import {
  Search,
  Download,
  Package,
  CreditCard,
  Truck,
  ArrowDown,
  ArrowUp,
  HandCoins,
  Handshake,
  Store,
  CirclePlus,
  MoreHorizontal,
  ArrowUpDown,
  Calendar,
  Hash,
  Settings,
  User,
  Wallet,
  CircleDollarSign,
  ListFilter,
} from "lucide-react"
import SearchBar from "../search"
import MetricsCard from "../analytics/MetricsCard"

interface Order {
  id: string
  customer: string
  total: number
  items: number
  orderDate: string
  orderTime: string
  paymentStatus: "success" | "pending" | "failed"
  paymentMethod: "visa" | "mastercard" | "apple_pay" | "google_pay" | "debit" | "crypto"
  fulfillmentStatus: "fulfilled" | "unfulfilled" | "cancelled"
  trackingNumber?: string
}

const mockOrders: Order[] = [
  {
    id: "4772827",
    customer: "Grill Vibe Restaurant",
    total: 4361,
    items: 1,
    orderDate: "24 Jun 2024",
    orderTime: "9:23 pm",
    paymentStatus: "success",
    paymentMethod: "debit",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "5839201",
    customer: "Café Central",
    total: 2610,
    items: 1,
    orderDate: "15 Mar 2023",
    orderTime: "2:45 pm",
    paymentStatus: "success",
    paymentMethod: "visa",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "9400110200830030504",
  },
  {
    id: "6273845",
    customer: "Hotel Atlas",
    total: 8425,
    items: 3,
    orderDate: "10 Apr 2022",
    orderTime: "11:30 am",
    paymentStatus: "success",
    paymentMethod: "apple_pay",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "1927489999999923597",
  },
  {
    id: "7382910",
    customer: "Restaurant Le Jardin",
    total: 15002,
    items: 1,
    orderDate: "28 Feb 2023",
    orderTime: "6:15 pm",
    paymentStatus: "success",
    paymentMethod: "google_pay",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "9405509699937001123",
  },
  {
    id: "8491763",
    customer: "Bistro Moderne",
    total: 4550,
    items: 1,
    orderDate: "19 May 2024",
    orderTime: "7:55 am",
    paymentStatus: "success",
    paymentMethod: "apple_pay",
    fulfillmentStatus: "unfulfilled",
  },
  {
    id: "9503842",
    customer: "Café des Arts",
    total: 3600,
    items: 1,
    orderDate: "03 Jan 2024",
    orderTime: "12:05 pm",
    paymentStatus: "success",
    paymentMethod: "visa",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "9274892700037459987",
  },
  {
    id: "1627493",
    customer: "Restaurant Traditionnel",
    total: 29999,
    items: 1,
    orderDate: "21 Jul 2023",
    orderTime: "8:40 pm",
    paymentStatus: "success",
    paymentMethod: "google_pay",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "9400110895674321078",
  },
  {
    id: "2738915",
    customer: "Brasserie du Centre",
    total: 58075,
    items: 1,
    orderDate: "16 Sep 2023",
    orderTime: "3:25 pm",
    paymentStatus: "success",
    paymentMethod: "debit",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "1Z857610003957632111",
  },
  {
    id: "3847269",
    customer: "Pizzeria Napoli",
    total: 125045,
    items: 2,
    orderDate: "04 Nov 2022",
    orderTime: "9:50 am",
    paymentStatus: "pending",
    paymentMethod: "debit",
    fulfillmentStatus: "unfulfilled",
  },
  {
    id: "4958327",
    customer: "Café Glacier",
    total: 7500,
    items: 1,
    orderDate: "30 Dec 2023",
    orderTime: "4:35 pm",
    paymentStatus: "success",
    paymentMethod: "google_pay",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "9400111691234567854",
  },
   {
    id: "4958227",
    customer: "Café Glacier",
    total: 112500,
    items: 200,
    orderDate: "30 Dec 2025",
    orderTime: "4:35 pm",
    paymentStatus: "success",
    paymentMethod: "debit",
    fulfillmentStatus: "fulfilled",
    trackingNumber: "9400111691234567854",
  },
  {
    id: "4958297",
    customer: "Café Splpl",
    total: 112500,
    items: 200,
    orderDate: "31 Dec 2025",
    orderTime: "14:35 pm",
    paymentStatus: "success",
    paymentMethod: "debit",
    fulfillmentStatus: "cancelled",
    trackingNumber: "9400111691234567854",
  }
]





const fulfillmentStatusConfig = {
  fulfilled: { label: "Fulfilled", className: "text-green-600", dot: "bg-green-500" },
  unfulfilled: { label: "Unfulfilled", className: "text-orange-600", dot: "bg-orange-500" },
  cancelled: { label: "Cancelled", className: "text-red-600", dot: "bg-red-500" },
}

export default function OrdersManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])


  const tabs = [
    { id: "all", label: "All", count: 156 },
    { id: "pending", label: "Pending", count: 23 },
    { id: "preparing", label: "Preparing", count: 18 },
    { id: "ready", label: "Ready", count: 12 },
    { id: "delivered", label: "Delivered", count: 98 },
    { id: "cancelled", label: "Cancelled", count: 5 },
  ]
 const paymentStatusConfig = {
  success: { label: "Success", className: "bg-green-100 text-green-800" },
  pending: { label: "Pending", className: "bg-purple-100 text-purple-800" },
  failed: { label: "Failed", className: "bg-red-100 text-red-800" },
}

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const toggleAllOrders = () => {
    setSelectedOrders(selectedOrders.length === mockOrders.length ? [] : mockOrders.map((order) => order.id))
  }
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
        label: "Total order value",
        value: "89,143 DH",
        change: "+12%",
        trend: "up" as const,
        chartData: [280, 290, 275, 310, 305, 320, 315, 340, 335, 350, 345, 364],
      },
      {
        id:2 ,
        label: "Pending orders",
        value: "21,765 DH",
        change: "+4%",
        trend: "up" as const,
        chartData: [60, 62, 59, 64, 63, 65, 64, 66, 65, 67, 66, 68],
      },
      {
        id:3 ,
        label: "Average processing time",
        value: "20",
        change: "-15%",
        trend: "down" as const,
        chartData: [3.2, 3.0, 3.1, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1],
      },
      {
        id:4,
        label: "Customer satisfaction",
        value: "4.3/5",
        change: "+0.2",
        trend: "up" as const,
        chartData: [4.0, 4.1, 3.9, 4.2, 4.1, 4.2, 4.1, 4.3, 4.2, 4.3, 4.2, 4.4],
      },
    ],
  }

  return (
    <div className=" dashboardBar h-screen w-full overflow-y-scroll">
      {/* Header Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-[#1D1D1F]">Orders Management</h1>
            <div className="bg-[#fc7348]/80 contrast-125 text-[#F3F3F3] px-3 py-1 rounded-full text-sm font-medium">156 <span className="font-normal">orders</span></div>
          </div>
          <div className="flex items-center gap-3">
           <SearchBar />
            <button className="flex items-center gap-2 px-4 py-2 text-[#1D1D1F]/70 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] cursor-pointer rounded-lg hover:bg-gray-200/40 transition-colors">
              <Download className="w-4 h-4" />
              Export orders
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#fc7348]/80 text-white rounded-lg hover:bg-[#fc7348]/90 contrast-125 cursor-pointer transition-colors">
              <CirclePlus className="w-4 h-4" />
                 Add product
            </button>
          </div>
        </div>

       
      </div>
      <div className="flex flex-col items-start w-full gap-3">
        <div className="text-xl font-medium text-[#1D1D1F]">Overview</div>
        <div className="grid grid-cols-1 mb-6 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
      
   
     

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-4  ">
          {/* Orders Overview Dashboard */}
          <div className="  rounded-lg flex w-full flex-col">
             <h2 className="text-xl font-medium text-[#1D1D1F] mb-4">Orders Overview</h2>
            
  
            {/* Orders Table */}
             <div className="flex flex-col">
      
              <div className="flex items-center justify-between   rounded-lg  ">
                {/* Tabs */}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg  bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] ">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id ? "bg-[#fc7348]/80 text-white shadow-2xl" : "text-[#1D1D1F]/70 hover:text-[#1D1D1F]"
                        }`}
                      >
                        {tab.label}
                        <span
                          className={`px-2 py-1 rounded-md flex items-center justify-center leading-3.5 text-xs ${
                            activeTab === tab.id ? "bg-[#F3F3F3] text-[#1D1D1F]" : "bg-gray-200/70 text-[#1D1D1F]/70"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 duration-300 cursor-pointer transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 duration-300 cursor-pointer transition-colors">
                  <ListFilter className="w-5 h-5" />
                </button>
                <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 duration-300 cursor-pointer transition-colors">
                  <ArrowUpDown className="w-5 h-5" />
                </button>
                <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 duration-300 cursor-pointer transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                  </div>
              </div>
              <div className="overflow-x-auto bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg mt-2">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr className="text-left">
                    <th className="px-6 py-2">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === mockOrders.length}
                        onChange={toggleAllOrders}
                        className="rounded border-gray-300  text-[#fc7348]/80 bg-amber-600"
                      />
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4" strokeWidth={1.5} />
                        <span className=" truncate ">Order ID</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" strokeWidth={1.5} />
                        <span>Customer</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center space-x-2">
                        <CircleDollarSign className="w-4 h-4" strokeWidth={1.5} />
                        <span>Total</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4" strokeWidth={1.5} />
                        <span>Items</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" strokeWidth={1.5} />
                        <span className=" truncate ">Order Date</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center font-normal space-x-2">
                        <CreditCard className="w-4 h-4" strokeWidth={1.5} />
                        <span>Payment</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center font-normal space-x-2">
                        <Wallet className="w-4 h-4" strokeWidth={1.5} />
                        <span className=" truncate ">Payment Method</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center font-normal space-x-2">
                        <Settings className="w-4 h-4" strokeWidth={1.5} />
                        <span>Fulfillment</span>
                      </div>
                    </th>
                    <th className="px-6 py-2 text-sm font-normal text-[#1D1D1F]/80">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4" strokeWidth={1.5} />
                        <span>Tracking Number</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="rounded border-gray-300  text-[#fc7348]/80 bg-amber-600"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1D1D1F]/90 font-medium">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-[#1D1D1F]/90   ">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-[#1D1D1F]/90 truncate">{order.total.toLocaleString()} DH</td>
                      <td className="px-6 py-4 text-sm text-[#1D1D1F]/90 truncate">
                        {order.items} item{order.items > 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1D1D1F]/90">
                        <div>{order.orderDate}</div>
                        <div className="text-xs text-[#1D1D1F]/70">{order.orderTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${paymentStatusConfig[order.paymentStatus].className}`}
                        >
                          {paymentStatusConfig[order.paymentStatus].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#1D1D1F]/90 capitalize">{order.paymentMethod.replace("_", " ")}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${fulfillmentStatusConfig[order.fulfillmentStatus].dot}`} />
                          <span className={`text-sm ${fulfillmentStatusConfig[order.fulfillmentStatus].className}`}>
                            {fulfillmentStatusConfig[order.fulfillmentStatus].label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1D1D1F]/90 font-mono">{order.trackingNumber || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
          </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}
