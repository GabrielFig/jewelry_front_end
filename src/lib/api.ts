import axios from "axios";
import Cookies from "js-cookie";

// CN-013: removed localhost fallback — set NEXT_PUBLIC_API_URL in .env.local
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT from cookie to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// CN-010: normalize errors — strip full Axios config (including auth headers) before propagating
api.interceptors.response.use(
  (res) => res,
  (error: { response?: { status?: number; data?: { detail?: string } }; message?: string }) => {
    const normalized = {
      message: error.response?.data?.detail ?? error.message ?? "Request failed",
      status: error.response?.status,
    };
    return Promise.reject(normalized);
  }
);

export default api;

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const categoriesApi = {
  list: () => api.get("/categories"),
  create: (data: { name: string; description: string }) => api.post("/categories", data),
};

// ─── Products ─────────────────────────────────────────────────────────────────
export const productsApi = {
  list: (params?: { category_id?: string; active_only?: boolean }) =>
    api.get("/products", { params }),
  get: (sku: string) => api.get(`/products/${sku}`),
  create: (data: object) => api.post("/products", data),
  updatePrice: (sku: string, data: { amount: number; currency: string }) =>
    api.patch(`/products/${sku}/price`, data),
  deactivate: (sku: string) => api.delete(`/products/${sku}`),
};

// ─── Orders ───────────────────────────────────────────────────────────────────
export const ordersApi = {
  create: (customer_id: string) => api.post("/orders", { customer_id }),
  get: (id: string) => api.get(`/orders/${id}`),
  listByCustomer: (customer_id: string) => api.get(`/orders/customer/${customer_id}`),
  addItem: (order_id: string, data: { sku: string; quantity: number }) =>
    api.post(`/orders/${order_id}/items`, data),
  confirm: (order_id: string) => api.post(`/orders/${order_id}/confirm`),
  pay: (order_id: string, method = "mock") =>
    api.post(`/orders/${order_id}/pay`, { payment_method: method }),
  ship: (order_id: string) => api.post(`/orders/${order_id}/ship`),
  cancel: (order_id: string) => api.post(`/orders/${order_id}/cancel`),
};

// ─── Customers ────────────────────────────────────────────────────────────────
export const customersApi = {
  create: (data: { email: string; name: string }) => api.post("/customers", data),
  list: () => api.get("/customers"),
};

// ─── Inventory ────────────────────────────────────────────────────────────────
export const inventoryApi = {
  listBatches: () => api.get("/inventory/batches"),
  addBatch: (data: { reference: string; sku: string; quantity: number; eta?: string }) =>
    api.post("/inventory/batches", data),
  allocate: (data: { order_id: string; sku: string; quantity: number }) =>
    api.post("/inventory/allocate", data),
};
