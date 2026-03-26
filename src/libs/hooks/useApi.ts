import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, productApi, orderApi, statsApi, type User, type Product, type Order } from '../api';

// Query Keys - centralized for consistency
export const queryKeys = {
  // Users
  users: ['users'] as const,
  usersList: (role?: string) => [...queryKeys.users, 'list', { role }] as const,
  userDetail: (id: string) => [...queryKeys.users, 'detail', id] as const,
  
  // Products
  products: ['products'] as const,
  productsList: (filters?: any) => [...queryKeys.products, 'list', filters] as const,
  productDetail: (id: string) => [...queryKeys.products, 'detail', id] as const,
  
  // Orders
  orders: ['orders'] as const,
  ordersList: (filters?: any) => [...queryKeys.orders, 'list', filters] as const,
  orderDetail: (id: string) => [...queryKeys.orders, 'detail', id] as const,
  
  // Stats
  stats: ['stats'] as const,
  supplierStats: (supplierId?: string) => [...queryKeys.stats, { supplierId }] as const,
};

// ============================================================================
// USER HOOKS
// ============================================================================

export const useUsers = (role?: string) => {
  return useQuery({
    queryKey: queryKeys.usersList(role),
    queryFn: async () => {
      const response = await userApi.getUsers(role);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.userDetail(id),
    queryFn: async () => {
      const response = await userApi.getUser(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) => userApi.createUser(userData),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...userData }: { id: string } & Partial<User>) => 
      userApi.updateUser(id, userData),
    
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.userDetail(variables.id), data.data);
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
};

// ============================================================================
// PRODUCT HOOKS
// ============================================================================

export const useProducts = (filters?: { 
  category?: string; 
  search?: string; 
  supplier?: string; 
  limit?: number 
}) => {
  return useQuery({
    queryKey: queryKeys.productsList(filters),
    queryFn: async () => {
      const response = await productApi.getProducts(filters);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.productDetail(id),
    queryFn: async () => {
      const response = await productApi.getProduct(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: Partial<Product>) => productApi.createProduct(productData),
    
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.products });

      const previousProducts = queryClient.getQueryData<Product[]>(
        queryKeys.productsList()
      );

      if (previousProducts) {
        const optimisticProduct = {
          id: Date.now(), // Temporary ID
          ...newProduct,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          supplier: { id: 0, name: 'Loading...', companyName: '' }
        } as Product;

        queryClient.setQueryData<Product[]>(
          queryKeys.productsList(),
          [optimisticProduct, ...previousProducts]
        );
      }

      return { previousProducts };
    },

    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(queryKeys.productsList(), context.previousProducts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...productData }: { id: string } & Partial<Product>) => 
      productApi.updateProduct(id, productData),
    
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.productDetail(variables.id), data.data);
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),
    
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.products });
      
      const previousProducts = queryClient.getQueryData<Product[]>(
        queryKeys.productsList()
      );

      if (previousProducts) {
        queryClient.setQueryData<Product[]>(
          queryKeys.productsList(), 
          previousProducts.filter(product => product.id.toString() !== deletedId)
        );
      }

      return { previousProducts };
    },

    onError: (err, deletedId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(queryKeys.productsList(), context.previousProducts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
};

// ============================================================================
// ORDER HOOKS
// ============================================================================

export const useOrders = (filters?: { 
  status?: string; 
  customerId?: string; 
  limit?: number 
}) => {
  return useQuery({
    queryKey: queryKeys.ordersList(filters),
    queryFn: async () => {
      const response = await orderApi.getOrders(filters);
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: queryKeys.orderDetail(id),
    queryFn: async () => {
      const response = await orderApi.getOrder(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      orderApi.updateOrderStatus(id, status),
    
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.orderDetail(variables.id), data.data);
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });
};

// ============================================================================
// STATS HOOKS
// ============================================================================

export const useStats = (supplierId?: string) => {
  return useQuery({
    queryKey: queryKeys.supplierStats(supplierId),
    queryFn: async () => {
      const response = await statsApi.getStats(supplierId);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};