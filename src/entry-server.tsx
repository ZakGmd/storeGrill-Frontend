import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import App from './App'
import About from './components/about'
import Layout from './components/supplier/layout'
import Login from './components/auth/login'
import Dashboard from './components/supplier/dashboard/dashboard'
import  OrdersManagement  from './components/supplier/commandes/orderManagement'
import AnalyticsDashboard from './components/supplier/analytics/analyticsDashboard'
import ProductsPage from './components/supplier/products/productsPage'
import clientHome from './pages/client/clientHome'
import Settings from './pages/supplier/settings'
import SignIn from './components/auth/signIn'
import ProductsMarketplacePage from './pages/client/products'
// Same route configuration as client


const routes = [
  {
    path: "/",
    children:[
      { index: true, Component: App },
      { path: "about", Component: About },
      { path: "sign-up", Component: Login },
      {path: "sign-in" , Component: SignIn} ,
      
      {
        path: "supplier",
        Component: Layout,
        children:[
          { index: true, Component: Dashboard },
          { path: "commandes", Component: OrdersManagement },
          { path: "analyses", Component: AnalyticsDashboard },
          { path: "products", Component: ProductsPage },
          { path: "parametres", Component: Settings },
        ]
      },
      {
        path: "marketplace", Component: clientHome,
        children:[
          {path: "products", Component: ProductsMarketplacePage}
        ]
      }
    ]
  },
]

export async function render(url: string) {

  const normalizedUrl = url || '/' ;
  console.log('Render SSR called with URL:', url, typeof url)
  
  if (!url || typeof url !== 'string') {
    console.warn('Invalid URL passed to render:', url)
    url = '/'
  }

  try {
    const { query, dataRoutes } = createStaticHandler(routes)
    const context = await query(new Request(`http://localhost:5173${normalizedUrl}`))

    if (context instanceof Response) {
      throw context
    }

    const router = createStaticRouter(dataRoutes, context)

    return renderToString(
      <StrictMode>
        <StaticRouterProvider router={router} context={context} />
      </StrictMode>
    )
  } catch (error) {
    console.error('SSR Error:', error)
    // Fallback to simple rendering
    return renderToString(
      <StrictMode>
        <div>Error loading page</div>
      </StrictMode>
    )
  }
}