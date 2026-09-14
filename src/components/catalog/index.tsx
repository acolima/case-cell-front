import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { products } from "../../mocks/products";
import Filters from "./filters";
import ProductCard from "./productCard";

export default function Catalog() {
  const [selectedBrand, setSelectedBrand] = useState("Todos");

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
