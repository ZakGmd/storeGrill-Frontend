import { useState, type ChangeEvent } from "react"
import { CircleCheck, Star, MapPin, CalendarPlus, Package, ChefHat, Snowflake, Armchair, Utensils, BrushCleaning, ToolCase, ShoppingCart } from "lucide-react"
import { NavLink } from "react-router";
import SearchBar from "../../components/supplier/search";

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  description: string;
  sku: string;
  category: string;
  minOrder?: number;
  bulkPrice?: number;
  inStock: boolean;
}

interface Supplier {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryFee: string;
  deliveryTime: string;
  location: string;
  specialties: string[];
  description: string;
  phone: string;
  address: string;
  businessHours: string;
  products: Product[];
  trustBadge: boolean;
  yearsInBusiness: number;
  reviewCount: number;
}

interface CartItem extends Product {
  quantity: number;
  supplierName: string;
}

type SortOption = "recommended" | "rating" | "delivery-time" | "price-low" | "price-high";
type LocationFilter = "Casablanca" | "Rabat" | "Marrakech" | "Tangier" | "Fes" | "";
type FilterOption = "fast-delivery" | "bulk-discounts" | "trust-verified" | "same-day";
type SlideSection = "featured" | "trusted-suppliers" | "recently-viewed";

export default function RestaurantSupplyMarketplace(){
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [selectedLocation, setSelectedLocation] = useState<LocationFilter>("")
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const suppliers: Supplier[] = [
    {
      id: 1,
      name: "Atlas Equipment ",
      image: "/resto1.jpg",
      rating: 4.8,
      deliveryFee: "Livraison gratuite",
      deliveryTime: "24h",
      location: "Casablanca",
      specialties: ["Kitchen equipment", "Refrigeration", "Utensils"],
      description: "Fournisseur leader d'équipements de restaurant au Maroc depuis 15 ans",
      phone: "+212 522 123 456",
      address: "Zone Industrielle, Casablanca",
      businessHours: "8h00 - 18h00",
      trustBadge: true,
      yearsInBusiness: 2,
      reviewCount: 247,
      products: [
        { id: 1, name: "Réfrigérateur Commercial 400L", price: 12500, unit: "unité", description: "Réfrigérateur professionnel en acier inoxydable", sku: "REF-400L", category: "Réfrigération", inStock: true },
        { id: 2, name: "Four Pizza Professionnel", price: 25000, unit: "unité", description: "Four à pizza électrique haute performance", sku: "FOUR-PIZZA", category: "Équipement", minOrder: 1, bulkPrice: 23000, inStock: true },
        { id: 3, name: "Set Couteaux Chef (12 pcs)", price: 850, unit: "set", description: "Couteaux professionnels en acier inoxydable", sku: "COUTEAU-SET", category: "Ustensiles", minOrder: 5, bulkPrice: 780, inStock: true },
      ],
    },
    {
      id: 2,
      name: "Maroc Food Service",
      image: "/resto2.jpg",
      rating: 4.6,
      deliveryFee: "50 DH",
      deliveryTime: "48h",
      location: "Rabat",
      specialties: ["Vaisselle", "Service", "Packaging",'Cleaning'],
      description: "Spécialiste de la vaisselle et articles de service pour restaurants",
      phone: "+212 537 234 567",
      address: "Hay Riad, Rabat",
      businessHours: "9h00 - 17h00",
      trustBadge: true,
      yearsInBusiness: 12,
      reviewCount: 189,
      products: [
        { id: 4, name: "Assiettes Porcelaine Blanche (24 pcs)", price: 320, unit: "lot", description: "Assiettes professionnelles résistantes", sku: "ASSIETTE-24", category: "Vaisselle", minOrder: 10, bulkPrice: 290, inStock: true },
        { id: 5, name: "Verres à Eau (36 pcs)", price: 180, unit: "lot", description: "Verres en verre trempé", sku: "VERRE-36", category: "Vaisselle", minOrder: 20, bulkPrice: 165, inStock: true },
        { id: 6, name: "Nappes Jetables (100 pcs)", price: 150, unit: "paquet", description: "Nappes en papier haute qualité", sku: "NAPPE-100", category: "Emballage", minOrder: 50, bulkPrice: 135, inStock: false },
      ],
    },
    {
      id: 3,
      name: "Pro Kitchen Solutions",
      image: "resto5.jpg",
      rating: 4.7,
      deliveryFee: "Livraison gratuite",
      deliveryTime: "24h",
      location: "Casablanca",
      specialties: ["Complete solutions", "Installation", "Maintenance"],
      description: "Solutions complètes pour équipement de cuisine professionnelle",
      phone: "+212 522 345 678",
      address: "Sidi Bernoussi, Casablanca",
      businessHours: "8h30 - 17h30",
      trustBadge: true,
      yearsInBusiness: 20,
      reviewCount: 312,
      products: [
        { id: 7, name: "Plancha Électrique 60cm", price: 4500, unit: "unité", description: "Plancha professionnelle électrique", sku: "PLANCHA-60", category: "Équipement", inStock: true },
        { id: 8, name: "Hotte Aspirante Inox 120cm", price: 3200, unit: "unité", description: "Hotte professionnelle avec moteur", sku: "HOTTE-120", category: "Ventilation", inStock: true },
        { id: 9, name: "Étagère Inox 4 Niveaux", price: 1200, unit: "unité", description: "Étagère de rangement professionnelle", sku: "ETAG-4N", category: "Rangement", minOrder: 2, bulkPrice: 1100, inStock: true },
      ],
    },
   
  ]

  const categories = [
    { name: "Kitchen equipment", icon: <ChefHat size={20}  strokeWidth={1} />, count: 45 },
    { name: "Refrigeration", icon: <Snowflake size={20} strokeWidth={1} />, count: 23 },
    { name: "Tableware", icon: <ToolCase size={20} strokeWidth={1} />, count: 67 },
    { name: "Utensils", icon: <Utensils size={20} strokeWidth={1} />, count: 89 },
     { name: "Packaging", icon: <Package size={20} strokeWidth={1} />, count: 28 },
    { name: "Cleaning", icon: <BrushCleaning size={20} strokeWidth={1} />, count: 19 },
    { name: "Furniture", icon: <Armchair size={20} strokeWidth={1} />, count: 15 },
  ]

  const handleSortChange = (value: SortOption): void => {
    setSortBy(value)
  }

  const handleLocationFilter = (location: LocationFilter): void => {
    setSelectedLocation(selectedLocation === location ? "" : location)
  }

  const handleFilterChange = (filter: FilterOption): void => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const filteredSuppliers: Supplier[] = suppliers.filter((supplier) => {
    if (selectedLocation && supplier.location !== selectedLocation) return false
    if (selectedFilters.includes("fast-delivery") && supplier.deliveryTime !== "24h") return false
    if (selectedFilters.includes("bulk-discounts") && !supplier.products.some(p => p.bulkPrice)) return false
    if (selectedFilters.includes("trust-verified") && !supplier.trustBadge) return false
    return true
  })

  const sortedSuppliers: Supplier[] = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "delivery-time":
        return a.deliveryTime.localeCompare(b.deliveryTime)
      default:
        return 0
    }
  })

  const addToCart = (item: Product, supplierName: string): void => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + (item.minOrder || 1) } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: item.minOrder || 1, supplierName }]
    })
  }

  const updateCartItemQuantity = (itemId: number, newQuantity: number): void => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalPrice = (): string => {
    return cartItems.reduce((total, item) => {
      const price = item.quantity >= (item.minOrder || 0) && item.bulkPrice ? item.bulkPrice : item.price
      return total + price * item.quantity
    }, 0).toLocaleString('fr-MA', { style: 'currency', currency: 'MAD' })
  }

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const [featuredIndex, setFeaturedIndex] = useState<number>(0)
  const [trustedIndex, setTrustedIndex] = useState<number>(0)
  const [recentIndex, setRecentIndex] = useState<number>(0)

  const nextSlide = (section: SlideSection): void => {
    switch (section) {
      case "featured":
        setFeaturedIndex((prev) => (prev + 1) % Math.max(1, suppliers.length - 2))
        break
      case "trusted-suppliers":
        setTrustedIndex((prev) => (prev + 1) % Math.max(1, suppliers.length - 2))
        break
      case "recently-viewed":
        setRecentIndex((prev) => (prev + 1) % Math.max(1, suppliers.length - 2))
        break
    }
  }

  const prevSlide = (section: SlideSection): void => {
    switch (section) {
      case "featured":
        setFeaturedIndex((prev) => (prev === 0 ? Math.max(0, suppliers.length - 3) : prev - 1))
        break
      case "trusted-suppliers":
        setTrustedIndex((prev) => (prev === 0 ? Math.max(0, suppliers.length - 3) : prev - 1))
        break
      case "recently-viewed":
        setRecentIndex((prev) => (prev === 0 ? Math.max(0, suppliers.length - 3) : prev - 1))
        break
    }
  }

  return (
    <div className="h-screen overflow-auto bg-white">
      {/* Header */}
      <header className=" px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden w-6 h-6 flex flex-col justify-center space-y-1"
              >
                <div className="w-full h-0.5 bg-gray-700"></div>
                <div className="w-full h-0.5 bg-gray-700"></div>
                <div className="w-full h-0.5 bg-gray-700"></div>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm" >
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">RestoLink</div>
                  <div className="text-xs text-gray-500">Maroc</div>
                </div>
              </div>
            </div>
            <nav className="hidden sm:flex space-x-6">
              <NavLink to={'/marketplace'} 
              className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-3 py-1   font-medium transition-colors ${
                      isActive
                        ? 'border-b b-2 border-[#fc9c76] text-[#fc7348]/90 '
                        : 'text-[#1D1D1F]/40 hover:bg-gray-50 hover:text-[#1D1D1F]/70'
                    }`
                  }
              >Suppliers</NavLink>
              <NavLink to={'/marketplace/products'} className="text-[#1D1D1F]/40 font-medium px-3 py-1 hover:text-[#1D1D1F]/60">Products</NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            
          <SearchBar placeholder="Search..." />
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center bg-[#fc7348]/80 space-x-1 text-white px-2 py-2 rounded-lg font-medium relative text-sm transition-colors  "
             
            >
             <ShoppingCart size={20} strokeWidth={1.5} className=" " />
              <span className="absolute   -top-1 -right-1 backdrop-blur-xs bg-[#c9fce004] shadow-[inset_0px_0.2px_0px_rgba(0,0,0,0.1),inset_0px_-0.3px_0px_rgba(255,255,255,0.5),inset_-0.3px_0px_0px_rgba(0,0,0,0.11),inset_0.3px_0px_0px_rgba(255,255,255,0.5),0px_1px_10px_rgba(0,0,0,0.11)]  text-white text-shadow-xs text-shadow-white/20 contrast-103 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {getTotalItems() > 0 ? getTotalItems() : 3}
              </span>
         
            </button>
            <button className="hidden sm:block">
               <div className="w-10 h-10 rounded-full shadow-[inset_0px_1px_1px_rgba(0,0,0,0.5),inset_0px_-1px_1px_rgba(0,0,0,0.5)] overflow-hidden">
                      <img loading="lazy" src={"me.jpeg"} alt="Supplier image" height={58} width={58} className="object-cover w-full h-full" />
                </div>
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 backdrop-blur-xs bg-white/1 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-80 lg:w-80 bg-white
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          p-6 overflow-y-auto shadow-sm lg:shadow-none
        `}
        >
          <div className="lg:hidden flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
            >
              ×
            </button>
          </div>

          {/* Categories Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#1D1D1F]/95 mb-4">Categories</h3>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="px-3 py-2 gap-1 group rounded-[10px] flex items-center duration-300 justify-between bg-[#FAFAFA] cursor-pointer hover:shadow-[0px_1.5px_5px_rgba(0,0,0,0.05),inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] transition-colors text-center"
                >
                  <div className="flex items-center gap-2 ">
                       <div className="  text-[#1D1D1F]/40 group-hover:text-[#1D1D1F] transition-all duration-300 ">{category.icon}</div>
                       <div className="text-xs font-medium text-[#1D1D1F]/40 transition-all duration-300 group-hover:text-[#1D1D1F]">{category.name}</div>
                  </div>
               
                  <div className="text-xs text-[#1D1D1F]/40 transition-all duration-300 group-hover:text-[#1D1D1F]/80">({category.count})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#1D1D1F]/95 mb-4">Sort by</h3>
            <div className="space-y-3">
            <label className="flex items-center gap-2 px-3 py-[9px] group hover:shadow-[0px_1.5px_5px_rgba(0,0,0,0.05),inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-[10px] cursor-pointer bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
                <input
                  type="radio"
                  name="sort"
                  value="recommended"
                  checked={sortBy === "recommended"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    handleSortChange(e.target.value as SortOption)
                  }
                  className="sr-only peer"
                />
                <div className="w-2 h-2 bg-white overflow-hidden duration-300 peer-checked:bg-[#ff9100] peer-checked:shadow-[inset_0px_0.4px_1.5px_rgba(255,255,255,1),inset_0px_-0.4px_1.7px_rgba(0,0,0,0.1),0px_0.2px_2px_rgba(0,0,0,0.2)] shadow-[inset_0px_0.4px_1.2px_rgba(0,0,0,0.2),inset_0px_-0.4px_1.2px_rgba(0,0,0,0.2)] rounded-full transition-all"></div>
                <span className="text-xs font-medium text-[#1D1D1F]/40 transition-all duration-300 group-hover:text-[#1D1D1F]/80 peer-checked:text-[#1D1D1F]">
                  Recommended
                </span>
              </label>
              <label className="flex items-center gap-2 px-3 py-[9px] group hover:shadow-[0px_1.5px_5px_rgba(0,0,0,0.05),inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-300  rounded-[10px] cursor-pointer bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
                <input
                  type="radio"
                  name="sort"
                  value="recommended"
                  checked={sortBy === "recommended"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    handleSortChange(e.target.value as SortOption)
                  }
                  className="sr-only peer"
                />
                <div className="w-2 h-2 bg-white overflow-hidden duration-300 peer-checked:bg-[#ff9100] peer-checked:shadow-[inset_0px_0.4px_1.2px_rgba(255,255,255,1),inset_0px_-0.4px_1.7px_rgba(0,0,0,0.1),0px_0.2px_2px_rgba(0,0,0,0.2)] shadow-[inset_0px_0.4px_1.2px_rgba(0,0,0,0.2),inset_0px_-0.4px_1.2px_rgba(0,0,0,0.2)] rounded-full transition-all"></div>
                <span className="text-xs font-medium text-[#1D1D1F]/40 transition-all duration-300 group-hover:text-[#1D1D1F]/80 peer-checked:text-[#1D1D1F] ">
                  Best rated
                </span>
              </label>
              <label className="flex items-center gap-2 px-3 py-[9px] group hover:shadow-[0px_1.5px_5px_rgba(0,0,0,0.05),inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] transition-all duration-300  rounded-[10px] cursor-pointer bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
                <input
                  type="radio"
                  name="sort"
                  value="recommended"
                  checked={sortBy === "recommended"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => 
                    handleSortChange(e.target.value as SortOption)
                  }
                  className="sr-only peer"
                />
                <div className="w-2 h-2 bg-white overflow-hidden duration-300 peer-checked:bg-[#ff9900] peer-checked:shadow-[inset_0px_0.4px_1.2px_rgba(255,255,255,1),inset_0px_-0.4px_1.7px_rgba(0,0,0,0.1),0px_0.2px_2px_rgba(0,0,0,0.2)] shadow-[inset_0px_0.4px_1.2px_rgba(0,0,0,0.2),inset_0px_-0.4px_1.2px_rgba(0,0,0,0.2)] rounded-full transition-all"></div>
                <span className="text-xs font-medium text-[#1D1D1F]/40 transition-all duration-300 group-hover:text-[#1D1D1F]/80 peer-checked:text-[#1D1D1F]">
                  Fast delivery
                </span>
              </label>
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#1D1D1F]/95 mb-4">City</h3>
            <div className="flex flex-wrap gap-2">
              {(["Casablanca","Rabat","Fes","Marrakech","Tangier"] as const).map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationFilter(location)}
                  className={`px-3 py-1 bg-[#FAFAFA] hover:text-[#1D1D1F]/80 hover:shadow-[0px_1.7px_5px_rgba(0,0,0,0.05),inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] duration-300 cursor-pointer shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] rounded-lg font-medium text-sm transition-all ${
                    selectedLocation === location
                      ? "text-[#1D1D1F]/80  "
                      : "  text-[#1D1D1F]/30"
                  }`}
                 
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
 
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Featured Suppliers */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#1D1D1F] tracking-[-0.12px]">Featured suppliers</h2>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800">See all</button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => prevSlide("featured")}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => nextSlide("featured")}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${featuredIndex * 33.333}%)`,
                }}
              >
                {sortedSuppliers.map((supplier) => (
                  <div key={supplier.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                    <div className="max-w-[273px] w-full overflow-hidden flex flex-col items-start gap-4 rounded-xl px-3 py-2 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]">
                      <div className="flex items-center gap-2">
                        <div className="w-[58px] h-[58px] rounded-full shadow-[inset_0px_1px_1px_rgba(0,0,0,0.5),inset_0px_-1px_1px_rgba(0,0,0,0.5)] overflow-hidden">
                          <img loading="lazy" src={supplier.image || '/placeholder.svg'} alt="Supplier image" height={58} width={58} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <div className="text-[#1D1D1F] tracking-3 font-medium">{supplier.name}</div> 
                          {supplier.trustBadge && (
                            <div className="text-[13px] px-1 bg-green-100 text-green-800 rounded-xl flex items-center gap-0.5">
                              <CircleCheck size={14} strokeWidth={1} />Verified
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start gap-1 w-full">
                        <div className="text-[#1D1D1F]/80 text-[14px]">General:</div>
                        <div className="flex flex-col items-start gap-2 w-full">
                          <div className="w-full items-center flex justify-between">
                            <div className="flex items-center gap-1">
                              <Star size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                              <div className="text-[#1D1D1F]/70 text-[14px]">Reviews</div>
                            </div>
                            <div className="text-[#1D1D1F] text-[14px] font-medium">{supplier.reviewCount}</div>
                          </div>
                          <div className="w-full items-center flex justify-between">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                              <div className="text-[#1D1D1F]/70 text-[14px]">Location</div>
                            </div>
                            <div className="text-[#1D1D1F] text-[14px] font-medium">{supplier.location}</div>
                          </div>
                          <div className="w-full items-center flex justify-between">
                            <div className="flex items-center gap-1">
                              <CalendarPlus size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                              <div className="text-[#1D1D1F]/70 text-[14px]">Experience</div>
                            </div>
                            <div className="text-[#1D1D1F] text-[14px] font-medium">{supplier.yearsInBusiness} years</div>
                          </div>
                          <div className="w-full items-center flex justify-between">
                            <div className="flex items-center gap-1">
                              <Package size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                              <div className="text-[#1D1D1F]/70 text-[14px]">Min order</div>
                            </div>
                            <div className="text-[#1D1D1F] text-[14px] font-medium">1000DH</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start gap-2 w-full">
                        <div className="text-[#1D1D1F]/80 text-[14px]">Specializations:</div>
                        <div className="w-full mask-alpha mask-l-from-[#fafafa] mask-l-from-90% mask-t-from-100% mask-b-from-99% mask-r-from-90% mask-r-from-[#fafafa]">
                          <div className="flex items-center gap-1 w-full ">
                            {supplier.specialties.slice(0, 5).map((specialty, index) => (
                              <div key={index} className="px-2 py-0.5 text-xs text-[#1D1D1F]/70 shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)] backdrop-blur-lg bg-gray-200/20 rounded-[6px] flex-shrink-0 whitespace-nowrap">
                                {specialty}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full flex items-center gap-2">
                        <div 
                          className="w-full px-3 py-2 text-center bg-[#fc7348]/80 cursor-pointer hover:bg-[#fc7348]/90 transition-all duration-300 text-white tracking-tight text-[14px] rounded-lg"
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          See products
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* All Suppliers */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#1D1D1F] tracking-[-0.12px]">All suppliers</h2>
              <div className="text-sm text-gray-500">45 suppliers available</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSuppliers.map((supplier) => (
                <div key={supplier.id} className="max-w-[273px] w-full overflow-hidden flex flex-col items-start gap-4 rounded-xl px-3 py-2 bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)] mx-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-[58px] h-[58px] rounded-full shadow-[inset_0px_1px_1px_rgba(0,0,0,0.5),inset_0px_-1px_1px_rgba(0,0,0,0.5)] overflow-hidden">
                      <img loading="lazy" src={supplier.image || '/placeholder.svg'} alt="Supplier image" height={58} width={58} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <div className="text-[#1D1D1F] tracking-3 font-medium">{supplier.name}</div> 
                      {supplier.trustBadge && (
                        <div className="text-[13px] px-1 bg-green-100 text-green-800 rounded-xl flex items-center gap-0.5">
                          <CircleCheck size={14} strokeWidth={1} />Verified
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start gap-2 w-full">
                    <div className="text-[#1D1D1F]/70 text-[14px]">General:</div>
                    <div className="flex flex-col items-start gap-2 w-full">
                      <div className="w-full items-center flex justify-between">
                        <div className="flex items-center gap-1">
                          <Star size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                          <div className="text-[#1D1D1F]/70 text-[14px]">Avis</div>
                        </div>
                        <div className="text-[#1D1D1F] text-[14px] font-medium">{supplier.reviewCount}</div>
                      </div>
                      <div className="w-full items-center flex justify-between">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                          <div className="text-[#1D1D1F]/70 text-[14px]">Location</div>
                        </div>
                        <div className="text-[#1D1D1F] text-[14px] font-medium">{supplier.location}</div>
                      </div>
                      <div className="w-full items-center flex justify-between">
                        <div className="flex items-center gap-1">
                          <CalendarPlus size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                          <div className="text-[#1D1D1F]/70 text-[14px]">Experience</div>
                        </div>
                        <div className="text-[#1D1D1F] text-[14px] font-medium">{supplier.yearsInBusiness} ans</div>
                      </div>
                      <div className="w-full items-center flex justify-between">
                        <div className="flex items-center gap-1">
                          <Package size={14} strokeWidth={1} className="text-[#1D1D1F]/70" />
                          <div className="text-[#1D1D1F]/70 text-[14px]">Commande min</div>
                        </div>
                        <div className="text-[#1D1D1F] text-[14px] font-medium">1000DH</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start gap-2 w-full">
                    <div className="text-[#1D1D1F]/70 text-[14px]">Spécialisations:</div>
                    <div className="w-full mask-alpha mask-l-from-[#fafafa] mask-l-from-90% mask-t-from-100% mask-b-from-99% mask-r-from-90% mask-r-from-[#fafafa]">
                      <div className="flex items-center gap-1">
                        {supplier.specialties.slice(0, 3).map((specialty, index) => (
                          <div key={index} className="px-2 py-0.5 text-xs text-[#1D1D1F]/70 shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.2),inset_0px_-0.5px_0px_rgba(0,0,0,0.2),inset_-0.4px_0px_0px_rgba(0,0,0,0.2),inset_0.4px_0px_0px_rgba(0,0,0,0.2)] backdrop-blur-lg bg-gray-200/20 rounded-[6px] flex-shrink-0 whitespace-nowrap">
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full flex items-center gap-2">
                    <div 
                      className="w-full px-3 py-2 text-center bg-[#fc7348]/80 cursor-pointer hover:bg-[#fc7348]/90 transition-all duration-300 text-white tracking-tight text-[14px] rounded-lg"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      See products
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Supplier Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 backdrop-blur-xs  bg-white/1 flex items-center justify-center z-50 p-4">
          <div className="dashboardBar bg-[#FAFAFA] rounded-xl max-w-3xl w-full max-h-[80vh] border border-black/10 overflow-y-auto">
            <div className="mask-alpha mask-t-from-[#fafafa] mask-t-from-180% mask-l-from-100% mask-r-from-99% mask-b-from-90% mask-b-from-[#fafafa] w-full h-full">
              <div className="relative">
              <img
                src={selectedSupplier.image || "/placeholder.svg"}
                alt={selectedSupplier.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedSupplier(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedSupplier.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedSupplier.description}</p>
                </div>
                {selectedSupplier.trustBadge && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Vérifié
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">Localisation:</span>
                  <div className="text-gray-600">{selectedSupplier.location}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Expérience:</span>
                  <div className="text-gray-600">{selectedSupplier.yearsInBusiness} ans</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Téléphone:</span>
                  <div className="text-gray-600">{selectedSupplier.phone}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Horaires:</span>
                  <div className="text-gray-600">{selectedSupplier.businessHours}</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-semibold text-gray-900">{selectedSupplier.rating}</span>
                  <span className="text-gray-500 ml-1">/ 5</span>
                </div>
                <span className="font-medium" style={{ color: '#fc7348' }}>
                  {selectedSupplier.deliveryFee}
                </span>
                <span className="text-gray-600">Livraison: {selectedSupplier.deliveryTime}</span>
              </div>

              <div className="mb-4">
                <span className="font-semibold text-gray-900">Spécialités: </span>
                <span className="text-gray-600">{selectedSupplier.specialties.join(", ")}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Produits populaires</h3>
              <div className="space-y-4">
                {selectedSupplier.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-lg gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        {!product.inStock && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            Rupture de stock
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-bold text-lg" style={{ color: '#fc7348' }}>
                          {product.price.toLocaleString()} DH / {product.unit}
                        </span>
                        {product.bulkPrice && (
                          <span className="text-green-600">
                            {product.bulkPrice.toLocaleString()} DH (prix gros)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        SKU: {product.sku}
                        {product.minOrder && ` • Commande min: ${product.minOrder} ${product.unit}(s)`}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product, selectedSupplier.name)}
                      disabled={!product.inStock}
                      className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                        product.inStock
                          ? "text-white hover:opacity-90"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      style={product.inStock ? { backgroundColor: '#fc7348' } : {}}
                    >
                      {product.inStock ? "Ajouter au panier" : "Non disponible"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 backdrop-blur-xs bg-white/1 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FAFAFA] border border-black/10  rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Votre panier</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  ×
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.supplierName}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="font-bold" style={{ color: '#fc7348' }}>
                              {(item.quantity >= (item.minOrder || 0) && item.bulkPrice ? item.bulkPrice : item.price).toLocaleString()} DH
                            </span>
                            <span className="text-sm text-gray-500">/ {item.unit}</span>
                          </div>
                          {item.minOrder && item.quantity < item.minOrder && (
                            <div className="text-xs text-red-600 mt-1">
                              Commande minimum: {item.minOrder} {item.unit}(s)
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateCartItemQuantity(item.id, Math.max(0, item.quantity - (item.minOrder || 1)))}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + (item.minOrder || 1))}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-900">Total: {getTotalPrice()}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <button 
                        className="w-full text-white py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#fc7348' }}
                      >
                        Demander un devis
                      </button>
                      <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                        Paiement à la livraison
                      </button>
                    </div>
                    <div className="text-center text-xs text-gray-500">
                      Conditions de paiement: Net 30/60/90 jours pour les entreprises
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}