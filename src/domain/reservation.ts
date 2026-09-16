import type { Product } from "./product";

export interface Reservation {
  id: string;
  productId: number;
  clientId: string;
  quantity: number;
  expiresAt: string;
}

export interface CartItem {
  reservation: Reservation;
  product: Product;
}
