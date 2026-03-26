import { useQuery } from '@tanstack/react-query'
import ProductListSkeleton from './productListSkeleton';
import ProductCard from './productCard';

declare global {
  interface Window {
    __INITIAL_DATA__?: any;
  }
}

export default function SupplierProduts() {
  const initialData = typeof window !== 'undefined' 
    ? window.__INITIAL_DATA__ 
    : null

  const { data: products, isLoading } = useQuery({
    queryKey: ['supplierProducts'],
    queryFn: () => fetch('/api/supplierProducts').then(res => res.json()),
    initialData: initialData, 
    staleTime: 5 * 60 * 1000 
  })

  if (isLoading && !initialData) {
    return <ProductListSkeleton />
  }

  return (
    <div>
      <h1>Restaurant Supply Products Test</h1>
      {products?.map((product : any ) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
