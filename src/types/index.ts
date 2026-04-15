export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  sku: string;
  name: string;
  description: string;
  price_amount: number;
  price_currency: string;
  category_id: string;
  attributes: Record<string, unknown>;
  image_url: string;
  is_active: boolean;
}

export interface CartItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
}

export interface OrderItem {
  sku: string;
  quantity: number;
  unit_price_amount: number;
  unit_price_currency: string;
  subtotal: number;
}

export interface Order {
  id: string;
  customer_id: string;
  status: "pending" | "confirmed" | "paid" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  total_amount: number;
  total_currency: string;
}

export interface BatchModel {
  reference: string;
  sku: string;
  purchased_quantity: number;
  available_quantity: number;
  eta: string | null;
}
