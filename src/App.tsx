import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products'>('home');
  const [renderCount, setRenderCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <div style={{ 
        backgroundColor: '#ff6b6b', 
        color: 'white', 
        padding: '10px', 
        marginBottom: '20px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2>⚠️ React 19.1.1 - WITHOUT Activity Component</h2>
        <p>Products page renders ONLY when you click it (causes delay!)</p>
      </div>

      {/* Navigation */}
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => {
            console.log('🏠 Switching to Home...');
            setCurrentPage('home');
          }}
          style={{ 
            padding: '10px 20px',
            backgroundColor: currentPage === 'home' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🏠 Home
        </button>
        
        <button 
          onClick={() => {
            console.log('📦 Switching to Products...');
            const startTime = performance.now();
            setCurrentPage('products');
            // Log after next render
            setTimeout(() => {
              const endTime = performance.now();
              console.log(`⏱️ Time to show Products: ${(endTime - startTime).toFixed(2)}ms`);
            }, 0);
          }}
          style={{ 
            padding: '10px 20px',
            backgroundColor: currentPage === 'products' ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📦 Products (Heavy Page)
        </button>

        <button 
          onClick={() => setRenderCount(renderCount + 1)}
          style={{ 
            marginLeft: 'auto', 
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          🔄 Force Re-render ({renderCount})
        </button>
      </nav>

      {/* Status */}
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f0f0f0', 
        marginBottom: '20px',
        borderRadius: '8px'
      }}>
        <strong>Current Page:</strong> {currentPage} <br />
        <strong>Status:</strong> {
          currentPage === 'products' 
            ? '✅ Products page rendered (just now when you clicked!)' 
            : '⏸️ Products page NOT rendered yet (will render when you click)'
        }
      </div>

      {/* Conditional Rendering - Traditional Approach */}
      <div style={{ 
        padding: '20px', 
        border: '3px solid blue',
        borderRadius: '8px',
        minHeight: '400px'
      }}>
        <h2>👁️ CURRENT PAGE</h2>
        
        {currentPage === 'home' && <HomePage />}
        
        {currentPage === 'products' && <HeavyProductsPage />}
        {/* ☝️ This ONLY renders when currentPage === 'products' 
               React starts rendering from scratch when you click!
               This causes the delay! */}
      </div>

      {/* Info Box */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#fff3cd',
        borderLeft: '4px solid #ffc107',
        borderRadius: '4px'
      }}>
        <strong>🔍 What's happening:</strong>
        <ul style={{ marginTop: '10px' }}>
          <li>Products page is <strong>NOT</strong> rendered until you click it</li>
          <li>When you click "Products", React starts rendering (causes delay)</li>
          <li>You'll feel a lag when switching to Products page</li>
        </ul>
      </div>
    </div>
  );
}

function HomePage() {
  console.log('🏠 HomePage rendered at:', new Date().toLocaleTimeString());
  
  return (
    <div>
      <h3>Welcome Home!</h3>
      <p>This is a lightweight page that loads instantly.</p>
      <p style={{ 
        padding: '10px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '4px',
        marginTop: '15px'
      }}>
        👉 <strong>Try this:</strong> Click "Products" and notice the delay! 
        The page has to render from scratch.
      </p>
      <p style={{ marginTop: '10px', color: '#666' }}>
        Open the Console (F12) to see timing logs!
      </p>
    </div>
  );
}

function HeavyProductsPage() {
  const renderStartTime = performance.now();
  console.log('⚙️ HeavyProductsPage START rendering at:', new Date().toLocaleTimeString());
  
  // Simulate HEAVY computation (10,000 products)
  const products = [];
  for (let i = 0; i < 10000; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: (Math.random() * 1000).toFixed(2),
      category: ['Electronics', 'Clothing', 'Food', 'Books'][Math.floor(Math.random() * 4)],
      description: `This is a very detailed description for product ${i}. `.repeat(10),
      inStock: Math.random() > 0.3
    });
  }
  
  // More expensive operations
  const topProducts = products
    .filter(p => parseFloat(p.price) > 500)
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    .slice(0, 100);
  
  const renderEndTime = performance.now();
  const renderTime = (renderEndTime - renderStartTime).toFixed(2);
  
  console.log(`✅ HeavyProductsPage FINISHED rendering in ${renderTime}ms at:`, new Date().toLocaleTimeString());

  return (
    <div>
      <h3>📦 Products Page (Heavy Component)</h3>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#ffebee', 
        borderRadius: '8px',
        marginBottom: '15px',
        border: '2px solid #f44336'
      }}>
        <strong>⚠️ This component just rendered from scratch!</strong>
        <p style={{ margin: '10px 0' }}>
          ⏱️ <strong>Render Time:</strong> {renderTime}ms<br />
          📊 <strong>Total Products:</strong> {products.length.toLocaleString()}<br />
          🏆 <strong>Top Products:</strong> {topProducts.length}
        </p>
        <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>
          👉 This delay happens EVERY time you click "Products"!
        </p>
      </div>

      <div style={{ 
        maxHeight: '300px', 
        overflow: 'auto', 
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead style={{ backgroundColor: '#f5f5f5', position: 'sticky', top: 0 }}>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Product</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Price</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Category</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 50).map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{product.name}</td>
                <td style={{ padding: '8px' }}>${product.price}</td>
                <td style={{ padding: '8px' }}>{product.category}</td>
                <td style={{ padding: '8px' }}>
                  {product.inStock ? '✅' : '❌'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ padding: '15px', textAlign: 'center', color: '#666', backgroundColor: '#fafafa' }}>
          ... and {(products.length - 50).toLocaleString()} more products
        </p>
      </div>
    </div>
  );
}

export default App;