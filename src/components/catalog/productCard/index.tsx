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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import type { Product } from "../../../domain/product";
import { styles } from "./styles";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const sx = styles({ backgroundColor: product.color });

  return (
    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card elevation={2} sx={sx.card}>
        <CardMedia sx={sx.media}>
          📱
          {product.tag && (
            <Chip label={product.tag} size="small" sx={sx.chip} />
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

          <Typography variant="h6" color="primary">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </Typography>
        </CardContent>

        <CardActions sx={sx.actions}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            size="medium"
          >
            Adicionar ao Carrinho
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
