import { useState, type ChangeEvent } from "react"

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
  images: string[];
  supplier: {
    id: number;
    name: string;
    location: string;
    rating: number;
    trustBadge: boolean;
  };
  specifications?: {
    [key: string]: string;
  };
  tags: string[];
}

interface CartItem extends Product {
  quantity: number;
}

type SortOption = "recommended" | "price-low" | "price-high" | "name" | "rating";
type CategoryFilter = "Équipement de cuisine" | "Réfrigération" | "Vaisselle" | "Ustensiles" | "Service" | "Emballage" | "Nettoyage" | "Mobilier" | "";
type LocationFilter = "Casablanca" | "Rabat" | "Marrakech" | "Tangier" | "Fez" | "";
type FilterOption = "in-stock" | "bulk-discounts" | "trust-verified" | "free-shipping";

export default function ProductsMarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("")
  const [selectedLocation, setSelectedLocation] = useState<LocationFilter>("")
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<{min: number; max: number}>({min: 0, max: 50000})

  const allProducts: Product[] = [
    {
      id: 1,
      name: "Réfrigérateur Commercial 400L",
      price: 12500,
      unit: "unité",
      description: "Réfrigérateur professionnel en acier inoxydable avec température réglable",
      sku: "REF-400L",
      category: "Réfrigération",
      inStock: true,
      images: ["/refrigerator-commercial.jpg", "/refrigerator-interior.jpg"],
      supplier: {
        id: 1,
        name: "Atlas Equipment Supply",
        location: "Casablanca",
        rating: 4.8,
        trustBadge: true
      },
      specifications: {
        "Capacité": "400L",
        "Matériau": "Acier inoxydable",
        "Température": "-2°C à +8°C",
        "Dimensions": "120x60x200 cm",
        "Garantie": "2 ans"
      },
      tags: ["Professionnel", "Économie d'énergie", "Inox"]
    },
    {
      id: 2,
      name: "Four Pizza Professionnel",
      price: 25000,
      unit: "unité",
      description: "Four à pizza électrique haute performance pour restaurant",
      sku: "FOUR-PIZZA",
      category: "Équipement de cuisine",
      minOrder: 1,
      bulkPrice: 23000,
      inStock: true,
      images: ["/pizza-oven.jpg", "/pizza-oven-interior.jpg"],
      supplier: {
        id: 1,
        name: "Atlas Equipment Supply",
        location: "Casablanca",
        rating: 4.8,
        trustBadge: true
      },
      specifications: {
        "Type": "Électrique",
        "Température max": "500°C",
        "Capacité": "4-6 pizzas",
        "Puissance": "8kW",
        "Garantie": "3 ans"
      },
      tags: ["Haute température", "Professionnel", "Électrique"]
    },
    {
      id: 3,
      name: "Set Couteaux Chef (12 pcs)",
      price: 850,
      unit: "set",
      description: "Set complet de couteaux professionnels en acier inoxydable",
      sku: "COUTEAU-SET",
      category: "Ustensiles",
      minOrder: 5,
      bulkPrice: 780,
      inStock: true,
      images: ["/knife-set.jpg", "/knife-details.jpg"],
      supplier: {
        id: 1,
        name: "Atlas Equipment Supply",
        location: "Casablanca",
        rating: 4.8,
        trustBadge: true
      },
      specifications: {
        "Nombre de pièces": "12",
        "Matériau": "Acier inoxydable",
        "Manche": "Polypropylène",
        "Inclus": "Étui de transport",
        "Garantie": "1 an"
      },
      tags: ["Set complet", "Professionnel", "Portable"]
    },
    {
      id: 4,
      name: "Assiettes Porcelaine Blanche (24 pcs)",
      price: 320,
      unit: "lot",
      description: "Assiettes professionnelles en porcelaine résistante aux chocs",
      sku: "ASSIETTE-24",
      category: "Vaisselle",
      minOrder: 10,
      bulkPrice: 290,
      inStock: true,
      images: ["/plates-white.jpg", "/plates-stack.jpg"],
      supplier: {
        id: 2,
        name: "Maroc Food Service",
        location: "Rabat",
        rating: 4.6,
        trustBadge: true
      },
      specifications: {
        "Matériau": "Porcelaine",
        "Diamètre": "27 cm",
        "Couleur": "Blanc",
        "Résistance": "Lave-vaisselle",
        "Garantie": "6 mois"
      },
      tags: ["Résistant", "Lave-vaisselle", "Professionnel"]
    },
    {
      id: 5,
      name: "Verres à Eau (36 pcs)",
      price: 180,
      unit: "lot",
      description: "Verres en verre trempé pour usage intensif",
      sku: "VERRE-36",
      category: "Vaisselle",
      minOrder: 20,
      bulkPrice: 165,
      inStock: true,
      images: ["/glasses-water.jpg", "/glasses-detail.jpg"],
      supplier: {
        id: 2,
        name: "Maroc Food Service",
        location: "Rabat",
        rating: 4.6,
        trustBadge: true
      },
      specifications: {
        "Capacité": "250ml",
        "Matériau": "Verre trempé",
        "Hauteur": "9 cm",
        "Résistance": "Chocs et température",
        "Garantie": "3 mois"
      },
      tags: ["Verre trempé", "Résistant", "Usage intensif"]
    },
    {
      id: 6,
      name: "Plancha Électrique 60cm",
      price: 4500,
      unit: "unité",
      description: "Plancha professionnelle électrique avec surface lisse",
      sku: "PLANCHA-60",
      category: "Équipement de cuisine",
      inStock: true,
      images: ["/plancha-electric.jpg", "/plancha-cooking.jpg"],
      supplier: {
        id: 3,
        name: "Pro Kitchen Solutions",
        location: "Casablanca",
        rating: 4.7,
        trustBadge: true
      },
      specifications: {
        "Largeur": "60 cm",
        "Puissance": "6kW",
        "Surface": "Acier laminé",
        "Température": "50°C à 300°C",
        "Garantie": "2 ans"
      },
      tags: ["Électrique", "Surface lisse", "Température variable"]
    },
    {
      id: 7,
      name: "Hotte Aspirante Inox 120cm",
      price: 3200,
      unit: "unité",
      description: "Hotte professionnelle avec moteur puissant",
      sku: "HOTTE-120",
      category: "Équipement de cuisine",
      inStock: true,
      images: ["/hood-exhaust.jpg", "/hood-installation.jpg"],
      supplier: {
        id: 3,
        name: "Pro Kitchen Solutions",
        location: "Casablanca",
        rating: 4.7,
        trustBadge: true
      },
      specifications: {
        "Largeur": "120 cm",
        "Débit": "1200 m³/h",
        "Matériau": "Acier inoxydable",
        "Filtres": "Inclus",
        "Installation": "Murale"
      },
      tags: ["Puissant", "Inox", "Filtres inclus"]
    },
    {
      id: 8,
      name: "Étagère Inox 4 Niveaux",
      price: 1200,
      unit: "unité",
      description: "Étagère de rangement professionnelle modulaire",
      sku: "ETAG-4N",
      category: "Équipement de cuisine",
      minOrder: 2,
      bulkPrice: 1100,
      inStock: true,
      images: ["/shelf-steel.jpg", "/shelf-kitchen.jpg"],
      supplier: {
        id: 3,
        name: "Pro Kitchen Solutions",
        location: "Casablanca",
        rating: 4.7,
        trustBadge: true
      },
      specifications: {
        "Niveaux": "4",
        "Dimensions": "150x50x180 cm",
        "Matériau": "Acier inoxydable",
        "Charge max": "100 kg par niveau",
        "Montage": "Démontable"
      },
      tags: ["Modulaire", "Inox", "Charge élevée"]
    }
  ]

  const categories = [
    { name: "Équipement de cuisine", icon: "🏪", count: allProducts.filter(p => p.category === "Équipement de cuisine").length },
    { name: "Réfrigération", icon: "❄️", count: allProducts.filter(p => p.category === "Réfrigération").length },
    { name: "Vaisselle", icon: "🍽️", count: allProducts.filter(p => p.category === "Vaisselle").length },
    { name: "Ustensiles", icon: "🔪", count: allProducts.filter(p => p.category === "Ustensiles").length },
    { name: "Service", icon: "🥤", count: allProducts.filter(p => p.category === "Service").length },
    { name: "Emballage", icon: "📦", count: allProducts.filter(p => p.category === "Emballage").length },
    { name: "Nettoyage", icon: "🧽", count: allProducts.filter(p => p.category === "Nettoyage").length },
    { name: "Mobilier", icon: "🪑", count: allProducts.filter(p => p.category === "Mobilier").length },
  ]

  const handleSortChange = (value: SortOption): void => {
    setSortBy(value)
  }

  const handleCategoryFilter = (category: CategoryFilter): void => {
    setSelectedCategory(selectedCategory === category ? "" : category)
  }

  const handleLocationFilter = (location: LocationFilter): void => {
    setSelectedLocation(selectedLocation === location ? "" : location)
  }

  const handleFilterChange = (filter: FilterOption): void => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const filteredProducts: Product[] = allProducts.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false
    if (selectedLocation && product.supplier.location !== selectedLocation) return false
    if (selectedFilters.includes("in-stock") && !product.inStock) return false
    if (selectedFilters.includes("bulk-discounts") && !product.bulkPrice) return false
    if (selectedFilters.includes("trust-verified") && !product.supplier.trustBadge) return false
    if (product.price < priceRange.min || product.price > priceRange.max) return false
    return true
  })

  const sortedProducts: Product[] = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "rating":
        return b.supplier.rating - a.supplier.rating
      default:
        return 0
    }
  })

  const addToCart = (product: Product): void => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === product.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + (product.minOrder || 1) } : cartItem,
        )
      }
      return [...prev, { ...product, quantity: product.minOrder || 1 }]
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

  return (
    <div className="h-screen overflow-scroll" style={{ backgroundColor: '#FCFCFC' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 px-4 sm:px-6 py-4">
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
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#fc7348' }}>
                  RS
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">RestaurantSupply</div>
                  <div className="text-xs text-gray-500">Maroc</div>
                </div>
              </div>
            </div>
            <nav className="hidden sm:flex space-x-6">
              <button className="text-gray-500 font-medium pb-2 hover:text-gray-700">Fournisseurs</button>
              <button className="text-gray-900 font-medium border-b-2 pb-2" style={{ borderColor: '#fc7348' }}>Produits</button>
            </nav>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#fc7348' }}></div>
              <span>Casablanca, Maroc</span>
              <span>•</span>
              <span>{sortedProducts.length} produits</span>
            </div>
            <div className="flex-1 max-w-xs sm:max-w-md">
              <input
                type="text"
                placeholder="Rechercher produits, marques, SKU..."
                className="w-full px-4 py-2 bg-gray-50 text-gray-900 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent text-sm border border-gray-200"
                
              />
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg font-medium relative text-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: '#fc7348' }}
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Panier {getTotalItems()}</span>
              <span className="sm:hidden">{getTotalItems()}</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <button className="hidden sm:block">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">👤</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
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
          p-6 border-r border-gray-100 overflow-y-auto shadow-sm lg:shadow-none
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryFilter(category.name as CategoryFilter)}
                  className={`w-full p-3 rounded-lg border transition-colors text-left ${
                    selectedCategory === category.name
                      ? "text-white border-transparent"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                  style={selectedCategory === category.name ? { backgroundColor: '#fc7348' } : {}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`text-sm ${selectedCategory === category.name ? 'text-white' : 'text-gray-500'}`}>
                      ({category.count})
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gamme de prix</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min || ""}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max || ""}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 50000 }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="text-sm text-gray-500">
                Prix en DH (Dirhams marocains)
              </div>
            </div>
          </div>

          {/* Sort Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trier par</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="sort"
                  value="recommended"
                  checked={sortBy === "recommended"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleSortChange(e.target.value as SortOption)}
                  className="w-4 h-4"
                  style={{ accentColor: '#fc7348' }}
                />
                <span className="text-gray-700">Recommandés</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="sort"
                  value="price-low"
                  checked={sortBy === "price-low"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleSortChange(e.target.value as SortOption)}
                  className="w-4 h-4"
                  style={{ accentColor: '#fc7348' }}
                />
                <span className="text-gray-700">Prix croissant</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="sort"
                  value="price-high"
                  checked={sortBy === "price-high"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleSortChange(e.target.value as SortOption)}
                  className="w-4 h-4"
                  style={{ accentColor: '#fc7348' }}
                />
                <span className="text-gray-700">Prix décroissant</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortBy === "name"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleSortChange(e.target.value as SortOption)}
                  className="w-4 h-4"
                  style={{ accentColor: '#fc7348' }}
                />
                <span className="text-gray-700">Nom A-Z</span>
              </label>
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fournisseur par ville</h3>
            <div className="flex flex-wrap gap-2">
              {(["Casablanca", "Rabat", "Marrakech", "Tangier", "Fez"] as const).map((location) => (
                <button
                  key={location}
                  onClick={() => handleLocationFilter(location)}
                  className={`px-3 py-2 rounded-lg border font-medium text-sm transition-colors ${
                    selectedLocation === location
                      ? "text-white border-transparent"
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                  style={selectedLocation === location ? { backgroundColor: '#fc7348' } : {}}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes("in-stock")}
                    onChange={() => handleFilterChange("in-stock")}
                    className="w-4 h-4"
                    style={{ accentColor: '#fc7348' }}
                  />
                  <span className="text-gray-700">En stock uniquement</span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes("bulk-discounts")}
                    onChange={() => handleFilterChange("bulk-discounts")}
                    className="w-4 h-4"
                    style={{ accentColor: '#fc7348' }}
                  />
                  <span className="text-gray-700">Remises quantité</span>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#fc7348' }}></div>
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes("trust-verified")}
                    onChange={() => handleFilterChange("trust-verified")}
                    className="w-4 h-4"
                    style={{ accentColor: '#fc7348' }}
                  />
                  <span className="text-gray-700">Fournisseurs vérifiés</span>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Catalogue de Produits</h1>
              <p className="text-gray-600">
                {sortedProducts.length} produits disponibles
                {selectedCategory && ` dans ${selectedCategory}`}
                {selectedLocation && ` à ${selectedLocation}`}
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-sm text-gray-500">Affichage:</span>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 border border-gray-400"></div>
              </button>
              <button className="p-2 rounded-lg" style={{ backgroundColor: '#fc7348' }}>
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white   rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-900 group"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {!product.inStock && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Rupture
                      </span>
                    )}
                    {product.bulkPrice && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Remise gros
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    {product.supplier.trustBadge && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 font-medium">{product.category}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      {product.supplier.rating}
                    </span>
                    <span>•</span>
                    <span>{product.supplier.name}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-xl" style={{ color: '#fc7348' }}>
                          {product.price.toLocaleString()} DH
                        </span>
                        <span className="text-gray-500 text-sm ml-1">/ {product.unit}</span>
                      </div>
                    </div>
                    {product.bulkPrice && (
                      <div className="text-sm text-green-600">
                        {product.bulkPrice.toLocaleString()} DH (prix gros)
                        {product.minOrder && ` dès ${product.minOrder} ${product.unit}(s)`}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    SKU: {product.sku}
                    {product.minOrder && ` • Min: ${product.minOrder} ${product.unit}(s)`}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                      product.inStock
                        ? "text-white hover:opacity-90"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    style={product.inStock ? { backgroundColor: '#fc7348' } : {}}
                  >
                    {product.inStock ? "Ajouter au panier" : "Non disponible"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">Essayez d'ajuster vos filtres ou votre recherche</p>
            </div>
          )}
        </main>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProduct.images[0] || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-sm font-medium" style={{ color: '#fc7348' }}>{selectedProduct.category}</span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#fc7348' }}>
                    {selectedProduct.price.toLocaleString()} DH
                  </div>
                  <div className="text-gray-500">par {selectedProduct.unit}</div>
                  {selectedProduct.bulkPrice && (
                    <div className="text-green-600 text-sm mt-2">
                      {selectedProduct.bulkPrice.toLocaleString()} DH (prix gros)
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Informations produit</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">SKU:</span>
                      <span className="font-medium">{selectedProduct.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disponibilité:</span>
                      <span className={selectedProduct.inStock ? "text-green-600" : "text-red-600"}>
                        {selectedProduct.inStock ? "En stock" : "Rupture de stock"}
                      </span>
                    </div>
                    {selectedProduct.minOrder && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commande minimum:</span>
                        <span className="font-medium">{selectedProduct.minOrder} {selectedProduct.unit}(s)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Fournisseur</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom:</span>
                      <span className="font-medium">{selectedProduct.supplier.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Localisation:</span>
                      <span className="font-medium">{selectedProduct.supplier.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Note:</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-medium">{selectedProduct.supplier.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vérification:</span>
                      <span className={selectedProduct.supplier.trustBadge ? "text-green-600" : "text-gray-500"}>
                        {selectedProduct.supplier.trustBadge ? "✓ Vérifié" : "Non vérifié"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              {selectedProduct.specifications && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Spécifications techniques</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Caractéristiques</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  disabled={!selectedProduct.inStock}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    selectedProduct.inStock
                      ? "text-white hover:opacity-90"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  style={selectedProduct.inStock ? { backgroundColor: '#fc7348' } : {}}
                >
                  {selectedProduct.inStock ? "Ajouter au panier" : "Non disponible"}
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Demander devis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                          <p className="text-sm text-gray-600">{item.supplier.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="font-bold" style={{ color: '#fc7348' }}>
                              {(item.quantity >= (item.minOrder || 0) && item.bulkPrice ? item.bulkPrice : item.price).toLocaleString()} DH
                            </span>
                            <span className="text-sm text-gray-500">/ {item.unit}</span>
                          </div>
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
                    <div className="space-y-2">
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