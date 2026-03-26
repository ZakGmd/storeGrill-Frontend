const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';

// Base API client
class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

const api = new ApiClient();

// Types matching your Prisma schema
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'SUPPLIER' | 'RESTAURANT' | 'ADMIN';
  companyName?: string;
  location?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: string; // Decimal comes as string
  category: string;
  imageUrl?: string;
  stock: number;
  isActive: boolean;
  supplierId: number;
  supplier: {
    id: number;
    name: string;
    companyName?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  total: string;
  customer: {
    id: number;
    name: string;
    companyName?: string;
    location?: string;
  };
  items: OrderItem[];
  deliveryAddress?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  product: {
    id: number;
    name: string;
    category: string;
  };
}

export interface Stats {
  products: {
    total: number;
    active: number;
    lowStock: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
  };
}

// API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// API functions
export const userApi = {
  getUsers: (role?: string) => 
    api.get<ApiResponse<User[]>>(`/api/users${role ? `?role=${role}` : ''}`),
  getUser: (id: string) => 
    api.get<ApiResponse<User>>(`/api/users/${id}`),
  createUser: (userData: Partial<User>) => 
    api.post<ApiResponse<User>>('/api/users', userData),
  updateUser: (id: string, userData: Partial<User>) => 
    api.put<ApiResponse<User>>(`/api/users/${id}`, userData),
  deleteUser: (id: string) => 
    api.delete<ApiResponse<{ message: string }>>(`/api/users/${id}`),
};

export const productApi = {
  getProducts: (params?: { category?: string; search?: string; supplier?: string; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.supplier) queryParams.append('supplier', params.supplier);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return api.get<ApiResponse<Product[]>>(`/api/products${query}`);
  },
  getProduct: (id: string) => 
    api.get<ApiResponse<Product>>(`/api/products/${id}`),
  createProduct: (productData: Partial<Product>) => 
    api.post<ApiResponse<Product>>('/api/products', productData),
  updateProduct: (id: string, productData: Partial<Product>) => 
    api.put<ApiResponse<Product>>(`/api/products/${id}`, productData),
  deleteProduct: (id: string) => 
    api.delete<ApiResponse<{ message: string }>>(`/api/products/${id}`),
};

export const orderApi = {
  getOrders: (params?: { status?: string; customerId?: string; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.customerId) queryParams.append('customerId', params.customerId);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return api.get<ApiResponse<Order[]>>(`/api/orders${query}`);
  },
  getOrder: (id: string) => 
    api.get<ApiResponse<Order>>(`/api/orders/${id}`),
  updateOrderStatus: (id: string, status: string) => 
    api.put<ApiResponse<Order>>(`/api/orders/${id}/status`, { status }),
};

export const statsApi = {
  getStats: (supplierId?: string) => {
    const query = supplierId ? `?supplierId=${supplierId}` : '';
    return api.get<ApiResponse<Stats>>(`/api/stats${query}`);
  },
};