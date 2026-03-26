import { BarChart3, Package, ShoppingCart, Users, TrendingUp, Settings } from "lucide-react";
import { NavLink } from "react-router";

export default function SuplierSideBar() {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/supplier' },
    { id: 'products', label: 'Products', icon: Package, path: '/supplier/products' },
    { id: 'commandes', label: 'Orders', icon: ShoppingCart, path: '/supplier/commandes' },
    { id: 'analyses', label: 'Analytics', icon: TrendingUp, path: '/supplier/analyses' },
    { id: 'parametres', label: 'Settings', icon: Settings, path: '/supplier/parametres' },
  ];

  return (
    <>
      <div className={`max-w-57 w-full h-full pb-2`}>
        <div className={`w-full px-3 py-2 h-full rounded-[12px] flex flex-col items-start bg-[#FAFAFA] shadow-[inset_0px_0.5px_0px_rgba(0,0,0,0.1),inset_0px_-0.5px_0px_rgba(0,0,0,0.1),inset_-0.4px_0px_0px_rgba(0,0,0,0.1),inset_0.4px_0px_0px_rgba(0,0,0,0.1)]`}>
          <div className="flex relative overflow-hidden items-center gap-2">
            <div className="w-10 h-10 overflow-hidden shadow-[inset_0px_1px_2px_rgba(0,0,0,0.2),inset_0px_-1px_2px_rgba(0,0,0,0.2)] bg-gradient-to-b from-white/40 to-[#fc7348]/30 rounded-full">
              <img src={'/logo.png'} alt="User image" height={40} width={40} className="object-cover w-full h-full z-20" />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-[16px] font-medium tracking-[-0.15px] leading-5">RestoLink</div>
              <div className="text-sm text-[#1D1D1F]/50">Supplier</div>
            </div>
          </div>
          <nav className="flex-1 mt-6 w-full space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  to={item.path}
                  key={item.id}
                  end={item.id === 'dashboard'} // Only exact match for dashboard
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-3 py-2.5 rounded-[12px] text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#fc7348]/80 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" strokeWidth={1.7} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}