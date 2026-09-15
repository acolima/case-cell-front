import type { NewProduct } from "../domain/newProduct";
import type { Product } from "../domain/product";
import api from "./api";

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>("/products");

  return response.data;
}

export async function createProduct(product: NewProduct): Promise<Product> {
  const response = await api.post<Product>("/products", product);

  return response.data;
}
