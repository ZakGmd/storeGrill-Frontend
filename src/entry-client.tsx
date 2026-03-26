import './index.css'
import { StrictMode, Suspense, lazy } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

// Eager imports for SSR routes
import App from './App'
import About from './components/about'
import clientHome from './pages/client/clientHome'
import Settings from './pages/supplier/settings'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsMarketplacePage from './pages/client/products'
import SignIn from './components/auth/signIn'

// Lazy imports for SPA routes
const Layout = lazy(() => import('./components/supplier/layout'))
const Login = lazy(() => import('./components/auth/login'))
const Dashboard = lazy(() => import('./components/supplier/dashboard/dashboard'))
const OrdersManagement = lazy(() => import('./components/supplier/commandes/orderManagement'))
const AnalyticsDashboard = lazy(() => import('./components/supplier/analytics/analyticsDashboard'))
const ProductsPage = lazy(() => import('./components/supplier/products/productsPage'))


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: App },
      { path: "about", Component: About },
      { path: "sign-up", Component: Login },
      {path: "sign-in" , Component: SignIn} ,
      
      {
        path: "supplier",
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: "commandes", Component: OrdersManagement },
          { path: "analyses", Component: AnalyticsDashboard },
          { path: "products", Component: ProductsPage },
          { path: "parametres", Component: Settings },
        ]
      },
      { path: "marketplace", Component: clientHome },
      { path: "marketplace/products", Component: ProductsMarketplacePage }
    ]
  },
])

const appElement = document.getElementById('root')!
const hasSSRContent = appElement.innerHTML.trim() !== ''
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
const AppWithSuspense = (
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />,
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
)

if (hasSSRContent) {
  hydrateRoot(appElement, AppWithSuspense)
} else {
  createRoot(appElement).render(AppWithSuspense)
}