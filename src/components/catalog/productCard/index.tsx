import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Rating,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import type { Product } from "../../../domain/product";
import { useCart } from "../../../contexts/CartContext";
import { styles } from "./styles";

interface ProductCardProps {
  product: Product;
  onProductAdded?: () => Promise<void> | void;
}

export default function ProductCard({
  product,
  onProductAdded,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSoldOut = product.quantity !== undefined && product.quantity <= 0;

  const sx = styles({
    backgroundColor: product.color,
    isSoldOut,
  });

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    try {
      const success = await addToCart(product, 1);
      if (success && onProductAdded) {
        await onProductAdded();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card elevation={2} sx={sx.card}>
        <CardMedia sx={sx.media}>
          📱
          {isSoldOut ? (
            <Chip label="Esgotado" size="small" sx={sx.soldOutChip} />
          ) : (
            product.tag && (
              <Chip label={product.tag} size="small" sx={sx.chip} />
            )
          )}
        </CardMedia>

        <CardContent sx={sx.content}>
          <Typography variant="subtitle1" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.model}
          </Typography>

          <Box sx={sx.ratingContainer}>
            <Rating
              value={product.rating}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="caption" color="text.secondary">
              ({product.reviews})
            </Typography>
          </Box>

          <Typography
            variant="h6"
            color={isSoldOut ? "text.secondary" : "primary"}
            sx={{ fontWeight: 700 }}
          >
            R$ {product.price.toFixed(2).replace(".", ",")}
          </Typography>
        </CardContent>

        <CardActions sx={sx.actions}>
          {isSoldOut ? (
            <Box sx={sx.soldOutContainer}>
              <RemoveShoppingCartOutlinedIcon
                sx={{ fontSize: 18, color: "text.disabled" }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "text.secondary" }}
              >
                Esgotado
              </Typography>
            </Box>
          ) : (
            <Button
              variant="contained"
              fullWidth
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <AddShoppingCartIcon />
                )
              }
              size="medium"
              disabled={isSubmitting}
              onClick={handleAddToCart}
            >
              {isSubmitting ? "Reservando..." : "Adicionar ao Carrinho"}
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
