import { Check, X, TrendingUp, Edit, Eye, Trash2, Archive, Coins, Package, PackagePlus, Store, ChartNoAxesCombined, Target, Settings } from "lucide-react"
import { useState } from "react"


export default function ProductTable({getStockStatus , filteredProducts , handleEditProduct, setProducts ,products}: any) {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([])
    const [inlineEditing, setInlineEditing] = useState<{ [key: number]: { field: string; value: string } } | null>(null)
    
  const handleQuickRestock = (productId: number, amount: number) => {
    setProducts(products.map((p:any) => (p.id === productId ? { ...p, stock: Math.max(0, p.stock + amount) } : p)))
  }
  const handleDeleteProduct = (productId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter((p:any) => p.id !== productId))
    }
  }
    const handleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    setSelectedProducts(selectedProducts.length === filteredProducts.length ? [] : filteredProducts.map((p:any) => p.id))
  }
   const handleInlineEditSave = (productId: number) => {
    if (!inlineEditing || !inlineEditing[productId]) return

    const { field, value } = inlineEditing[productId]
    setProducts(
      products.map((p :any) =>
        p.id === productId
          ? { ...p, [field]: field === "price" || field === "stock" || field === "minStock" ? Number(value) : value }
          : p,
      ),
    )
    setInlineEditing(null)
  }

  const handleInlineEditCancel = () => {
    setInlineEditing(null)
  }
   const handleInlineEdit = (productId: number, field: string, currentValue: string) => {
    setInlineEditing({ [productId]: { field, value: currentValue } })
  }

    return(
        <>
         <table className="w-full">
                <thead className=" border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-2  text-left">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" strokeWidth={1.5} />
                        Produit
                      </div>
                    </th>
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                      <div className="flex items-center gap-2">
                        <Archive className="w-4 h-4" strokeWidth={1.5} />
                        Catégorie
                      </div>
                    </th>
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4" strokeWidth={1.5} />
                        Prix
                        </div>
                    </th>
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                      <div className="flex items-center gap-2 pl-4">
                      <Store className="w-4 h-4" strokeWidth={1.5} />
                       Stock
                      </div>
                    </th>
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                    <div className="flex items-center gap-2">
                      <PackagePlus className="w-4 h-4" strokeWidth={1.5} />
                      Ventes
                      </div>
                      
                    </th>
                    
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                     <div className="flex items-center gap-2">
                      <ChartNoAxesCombined className="w-4 h-4" strokeWidth={1.5} />
                      Performance
                      </div>
                    </th>
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                      <Target className="w-4 h-4" strokeWidth={1.5} />
                       Status
                      </div>
                    </th>
                    <th className="text-left px-6 py-2 font-normal text-[#1D1D1F]/80 text-sm  tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                      <Settings className="w-4 h-4" strokeWidth={1.5} />
                      Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredProducts.map((product :any) => {
                    const stockStatus = getStockStatus(product.stock, product.minStock)
                    
                    return (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 overflow-hidden shadow-[inset_0px_0.5px_1px_rgba(0,0,0,0.2),inset_0px_-0.5px_1px_rgba(0,0,0,0.2)] rounded-[8px]">
                              <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="object-contain w-full h-full "
                               />
                            </div>
                            
                            <div>
                              <div className="font-medium text-[#1D1D1F]/90">{product.name}</div>
                              <div className="text-sm text-[#1D1D1F]/70">{product.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#1D1D1F]/90">{product.category}</td>
                        <td className="px-6 py-4">
                          {inlineEditing && inlineEditing[product.id]?.field === "price" ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={inlineEditing[product.id].value}
                                onChange={(e) =>
                                  setInlineEditing({ [product.id]: { field: "price", value: e.target.value } })
                                }
                                className="w-20 px-2 py-1 text-sm border rounded"
                              />
                              <button
                                onClick={() => handleInlineEditSave(product.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={handleInlineEditCancel} className="text-red-600 hover:text-red-800">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span
                              className="text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                              onClick={() => handleInlineEdit(product.id, "price", product.price.toString())}
                            >
                              {product.price} DH
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {inlineEditing && inlineEditing[product.id]?.field === "stock" ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={inlineEditing[product.id].value}
                                  onChange={(e) =>
                                    setInlineEditing({ [product.id]: { field: "stock", value: e.target.value } })
                                  }
                                  className="w-16 px-1 py-1 text-sm border rounded"
                                />
                                <button
                                  onClick={() => handleInlineEditSave(product.id)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                                <button onClick={handleInlineEditCancel} className="text-red-600 hover:text-red-800">
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div
                                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full cursor-pointer hover:opacity-80 ${stockStatus.bg} ${stockStatus.color}`}
                                  onClick={() => handleInlineEdit(product.id, "stock", product.stock.toString())}
                                >
                                  {product.stock}
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleQuickRestock(product.id, 10)}
                                    className="px-1 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200"
                                  >
                                    +10
                                  </button>
                                  <button
                                    onClick={() => handleQuickRestock(product.id, -10)}
                                    className="px-1 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                                  >
                                    -10
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#1D1D1F]/90">
                          <div className="flex items-center pl-6">{product.sales}</div>  
                          
                        </td>
                       
                        <td className="px-6 py-4">
                          <div className="flex items-center pl-6">
                            <TrendingUp
                              className={`w-4 h-4 mr-1 ${product.growth >= 0 ? "text-green-500" : "text-red-500"}`}
                            />
                            <span
                              className={`text-sm font-medium ${product.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {product.growth >= 0 ? "+" : ""}
                              {product.growth}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4  ">
                          <div
                            className={` flex px-2 py-1  text-xs font-medium rounded-full justify-center ${
                              product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.status === "active" ? "Actif" : "Inactif"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 items-center justify-center">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-1 text-gray-400 hover:text-[#fc7348]/80 duration-300 cursor-pointer transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-[#fc7348]/80 duration-300 cursor-pointer transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1 text-gray-400 hover:text-[#fc7348]/80 duration-300 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
        
        </>
    )
}