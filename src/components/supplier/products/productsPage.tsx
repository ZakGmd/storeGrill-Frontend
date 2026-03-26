"use client"

import { useState } from "react"
import {
  Grid3X3,
  List,
  Upload,
  Save,
  X,
  TrendingUp,
  Package,
  CheckCircle,
  AlertTriangle,
  Filter,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
} from "lucide-react"
import MetricsCard from "../analytics/MetricsCard"
import ProductCard from "./productCard"
import ProductTable from "./productTable"
import SearchBar from "../search"

// Extended product data with all necessary fields
const productsData = [
  {
    id: 1,
    name: "Gold tea glasses",
    category: "Glassware",
    sku: "GTG-001",
    price: 45,
    stock: 156,
    minStock: 50,
    status: "active",
    sales: 156,
    revenue: 12450,
    growth: 18,
    image: "/products.png",
    views: 234,
    conversion: 12.5,
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "White ceramic plates 25cm",
    category: "Dinnerware",
    sku: "WCP-025",
    price: 32,
    stock: 40,
    minStock: 120,
    status: "active",
    sales: 89,
    revenue: 8950,
    growth: 12,
    image: "/products.png",
    views: 189,
    conversion: 8.3,
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    name: "Stainless steel cutlery set",
    category: "Cutlery",
    sku: "SSC-SET",
    price: 78,
    stock: 25,
    minStock: 30,
    status: "active",
    sales: 67,
    revenue: 15670,
    growth: 25,
    image: "/products.png",
    views: 156,
    conversion: 15.2,
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    name: "Various coffee cups",
    category: "Drinkware",
    sku: "VCC-MIX",
    price: 28,
    stock: 0,
    minStock: 50,
    status: "inactive",
    sales: 45,
    revenue: 4500,
    growth: -5,
    image: "/products.png",
    views: 98,
    conversion: 6.1,
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    name: "Professional chef knives",
    category: "Cutlery",
    sku: "PCK-PRO",
    price: 125,
    stock: 18,
    minStock: 25,
    status: "active",
    sales: 34,
    revenue: 8750,
    growth: 8,
    image: "/products.png",
    views: 145,
    conversion: 11.2,
    lastUpdated: "2024-01-11",
  },
  {
    id: 6,
    name: "Glass water bottles",
    category: "Glassware",
    sku: "GWB-500",
    price: 22,
    stock: 95,
    minStock: 40,
    status: "active",
    sales: 78,
    revenue: 3900,
    growth: 15,
    image: "/products.png",
    views: 167,
    conversion: 9.8,
    lastUpdated: "2024-01-10",
  },
]



export default function ProductsPage() {
  const [products, setProducts] = useState(productsData)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [sortBy, setSortBy] = useState("name")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "Glassware",
    sku: "",
    price: "",
    stock: "",
    minStock: "",
    status: "active",
    image: "",
  })
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | null>(null)
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory
      const matchesStatus = statusFilter === null || product.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "stock":
          return b.stock - a.stock
        case "sales":
          return b.sales - a.sales
        case "date":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { status: "out", color: "text-red-600", bg: "bg-red-50" }
    if (stock <= minStock) return { status: "low", color: "text-orange-600", bg: "bg-orange-50" }
    return { status: "good", color: "text-green-600", bg: "bg-green-50" }
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      sku: product.sku,
      price: product.price.toString(),
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      status: product.status,
      image: product.image,
    })
    setShowEditModal(true)
  }

  const handleSaveProduct = () => {
    const newProduct = {
      id: editingProduct ? editingProduct.id : '',
      name: formData.name,
      category: formData.category,
      sku: formData.sku,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      minStock: Number.parseInt(formData.minStock),
      status: formData.status,
      image: formData.image || "/placeholder.svg",
      sales: editingProduct ? editingProduct.sales : 0,
      revenue: editingProduct ? editingProduct.revenue : 0,
      growth: editingProduct ? editingProduct.growth : 0,
      views: editingProduct ? editingProduct.views : 0,
      conversion: editingProduct ? editingProduct.conversion : 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)))
    } 

    setShowAddModal(false)
    setShowEditModal(false)
    setEditingProduct(null)
  }
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const getStockVelocity = (sales: number, stock: number) => {
    if (stock === 0) return "Rupture"
    const daysToSellOut = Math.round((stock / sales) * 30) // Assuming sales are monthly
    if (daysToSellOut < 7) return "Très rapide"
    if (daysToSellOut < 30) return "Rapide"
    if (daysToSellOut < 90) return "Modéré"
    return "Lent"
  }
  const kpiData = [
   
      {
        label: "Total Products",
        value: "342",
        change: "+10%",
        trend: "up" as const,
        chartData: [1100, 1150, 1080, 1200, 1180, 1250, 1220, 1300, 1280, 1350, 1320, 1400],
      },
      {
        label: "Active Products",
        value: "21",
        change: "-2.1%",
        trend: "down" as const,
        chartData: [21, 21.5, 20.8, 22, 21.8, 22.5, 22.2, 23, 22.8, 23.5, 23.2, 23.8],
      },
      {
        label: "Total Sales",
        value: "568",
        change: "+15%",
        trend: "up" as const,
        chartData: [3600, 3580, 3620, 3550, 3570, 3500, 3520, 3480, 3460, 3420, 3440, 3400],
      },
      {
        label: "Low Stock",
        value: "8",
        change: "+10%",
        trend: "down" as const,
        chartData: [95, 92, 88, 90, 87, 89, 91, 88, 90, 89, 87, 89],
      },
    ]
  
  return (
    <div className="dashboardBar overflow-y-scroll h-screen  w-full ">
       <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-[#1D1D1F]">Product Management</h1>
            </div>
             <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#fc7348]/80 text-white rounded-lg hover:bg-[#fc7348]/90 contrast-125 cursor-pointer transition-colors">
                 <CirclePlus className="w-4 h-4" />
                Add product

             </button>
       </div>
        
     

      <div className=" w-full flex flex-col items-start  ">
        <div className="flex flex-col items-start w-full gap-3">
          <div className="text-xl font-medium text-[#1D1D1F]">Overview</div>
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6  w-full ">
          {kpiData.map((kpi, index) => {
            const icons = [
            <Package key="store" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
            <CheckCircle key="handCoins" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
            <TrendingUp key="package" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
            <AlertTriangle key="star" strokeWidth={1.7} size={20} className="text-gray-400 min-w-[18px]"  />,
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
       

        <div className="flex flex-col items-start gap-3   w-full mb-6">
          <div className="text-xl font-medium text-[#1D1D1F]">Products</div>
          <div className="flex items-center justify-between w-full">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1  p-1 rounded-lg  bg-[#FAFAFA] shadow-[inset_0px_1px_1px_rgba(0,0,0,0.05),inset_0px_-1px_1px_rgba(0,0,0,0.03)]">
              <button
                onClick={() => setSelectedCategory("Tous")}
                className={`flex items-center gap-2 px-4 py-2  rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === "Tous" ? "bg-[#fc7348]/90 text-white shadow-2xs" : "text-[#1D1D1F]/70 hover:text-[#1D1D1F]"
                }`}
              >
                All
                <div className={`px-2 py-[5px] rounded-md inline-flex items-center justify-center leading-2.5 text-xs text-[#1D1D1F] bg-[#F3F3F3]`}>
                  156
                </div>
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`flex items-center gap-2 px-4 py-2  rounded-md text-sm font-medium transition-colors ${
                  statusFilter === "active" ? "bg-[#fc7348]/80 text-white shadow-2xs" : "text-[#1D1D1F]/70 hover:text-[#1D1D1F]"
                }`}
              >
                Active
                <div className={`px-2 py-[5px] rounded-md inline-flex items-center justify-center leading-2.5 text-xs text-[#1D1D1F] bg-[#F3F3F3]`}>
                  144
                </div>
              </button>
              <button
                onClick={() => setStatusFilter("inactive")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === "inactive" ? "bg-[#fc7348]/80 text-white shadow-2xs" : "text-[#1D1D1F]/70 hover:text-[#1D1D1F]"
                }`}
              >
                Non Active
                <div className={`px-2 py-[5px] rounded-md inline-flex items-center justify-center leading-2.5 text-xs text-[#1D1D1F] bg-[#F3F3F3]`}>
                  12
                </div>
              </button>
            </div>
            {/* View Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#FAFAFA] border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-l-lg flex items-center gap-2 ${
                    viewMode === "list" ? "bg-[#fc7348]/80 text-white" : " text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="text-sm">Table</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-r-lg flex items-center gap-2 ${
                    viewMode === "grid" ? "bg-[#fc7348]/80 text-white" : " text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="text-sm">Columns</span>
                </button>
              </div>

              <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
              </button>
               <SearchBar />   
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-5 gap-6 mb-6">
              {filteredProducts.slice(0, 10).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show</span>
                <select className="border border-gray-300 rounded px-2 py-1">
                  <option>8</option>
                  <option>16</option>
                  <option>24</option>
                </select>
                <span>per page</span>
              </div>

              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded ${
                      page === 2 ? "bg-red-500 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 text-gray-600 hover:text-gray-800">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[#FAFAFA] rounded-lg w-full shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]  overflow-hidden">
            <div className="overflow-x-auto">
             <ProductTable getStockStatus={getStockStatus} filteredProducts={filteredProducts} handleEditProduct={handleEditProduct}  getStockVelocity={getStockVelocity} products={products} />
            </div>
          </div>
        )}

      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[8px]  flex items-center justify-center z-50 p-4">
          <div className="bg-[#FAFAFA] rounded-lg max-w-2xl w-full max-h-[90vh] shadow-[0px_1px_60px_rgba(29,29,31,0.05),inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add product</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Verres à thé dorés"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Glassware">Glassware</option>
                    <option value="Dinnerware">Dinnerware</option>
                    <option value="Cutlery">Cutlery</option>
                    <option value="Drinkware">Drinkware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleFormChange("sku", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: GTG-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (DH)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock initial *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleFormChange("stock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock minimum *</label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => handleFormChange("minStock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image du produit</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Cliquez pour télécharger ou glissez-déposez</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-transparent hover:border-gray-300/60 rounded-lg transition-all duration-200 cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-[#fc7348]/80 text-white rounded-lg hover:bg-[#fc7348] transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <CirclePlus className="w-4 h-4" />
                Add product

              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[8px]  flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Modifier le produit</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFormChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Glassware">Glassware</option>
                    <option value="Dinnerware">Dinnerware</option>
                    <option value="Cutlery">Cutlery</option>
                    <option value="Drinkware">Drinkware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleFormChange("sku", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix (DH) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock actuel *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleFormChange("stock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock minimum *</label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => handleFormChange("minStock", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image du produit</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Cliquez pour télécharger ou glissez-déposez</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
