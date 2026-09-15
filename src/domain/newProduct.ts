import type { Product } from "./product";

export interface NewProduct extends Omit<Product, "id" | "createdAt"> {}
