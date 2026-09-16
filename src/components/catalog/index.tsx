import { Container, Grid } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import Filters from "./filters";
import ProductCard from "./productCard";
import { getProducts } from "../../services/productService";
import { useCart } from "../../contexts/CartContext";
import type { Product } from "../../domain/product";

const REFRESH_INTERVAL_MS = 60 * 1000;

export default function Catalog() {
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [products, setProducts] = useState<Product[]>([]);
  const { catalogRefreshKey } = useCart();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      if (data && Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.warn("Não foi possível buscar os produtos da API:", err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const intervalId = setInterval(() => {
      fetchProducts();
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [fetchProducts, catalogRefreshKey]);

  const filteredProducts =
    selectedBrand === "Todos"
      ? products
      : products.filter((p) => p.brand === selectedBrand);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Filters
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductAdded={fetchProducts}
          />
        ))}
      </Grid>
    </Container>
  );
}
