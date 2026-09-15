import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Filters from "./filters";
import ProductCard from "./productCard";
import { getProducts } from "../../services/productService";
import type { Product } from "../../domain/product";

export default function Catalog() {
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    const products = await getProducts();

    setProducts(products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
          <ProductCard product={product} />
        ))}
      </Grid>
    </Container>
  );
}
