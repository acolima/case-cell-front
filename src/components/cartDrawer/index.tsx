import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Chip,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useCart } from "../../contexts/CartContext";
import CountdownTimer from "./countdownTimer";
import QuantityControl from "./quantityControl";
import OrderSuccessDialog from "./orderSuccessModal";
import { styles } from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
import OrderFailDialog from "./orderFailModal";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    totalReservedCount,
    totalPrice,
    orderExpiresAt,
    removeFromCart,
    handleOrderExpired,
    finalizeOrder,
    isCheckingOut,
  } = useCart();

  return (
    <>
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={closeCart}
        slotProps={{
          paper: {
            sx: styles.drawerPaper,
          },
        }}
      >
        <Box sx={styles.header}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShoppingBagOutlinedIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Seu Pedido
            </Typography>
            {totalReservedCount > 0 && (
              <Chip
                label={`${totalReservedCount} ${
                  totalReservedCount === 1 ? "item" : "itens"
                }`}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
          <IconButton onClick={closeCart} size="small" aria-label="Fechar">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={styles.content}>
          {items.length === 0 ? (
            <Box sx={styles.emptyBox}>
              <ShoppingBagOutlinedIcon
                sx={{ fontSize: 64, mb: 2, color: "#ccc" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Seu carrinho está vazio
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Escolha suas capinhas favoritas no catálogo!
              </Typography>
              <Button variant="outlined" color="primary" onClick={closeCart}>
                Continuar Comprando
              </Button>
            </Box>
          ) : (
            <>
              {orderExpiresAt && (
                <Box sx={styles.orderTimerBanner}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon color="primary" fontSize="small" />

                    <Box>
                      <Typography variant="caption" sx={styles.caption}>
                        EXPIRAÇÃO DO PEDIDO
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Finalize sua compra antes do prazo
                      </Typography>
                    </Box>
                  </Box>
                  <CountdownTimer
                    expiresAt={orderExpiresAt}
                    onExpire={handleOrderExpired}
                  />
                </Box>
              )}

              {items.map((item) => {
                const product = item.product;
                const reservation = item.reservation;
                const itemTotal =
                  (product?.price || 0) * (reservation.quantity || 1);

                return (
                  <Box key={reservation.id} sx={styles.itemCard}>
                    <Box sx={styles.itemThumbnail(product?.color)}>📱</Box>

                    <Box sx={styles.itemInfo}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {product?.name || `Produto #${reservation.productId}`}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        {product?.model} • {product?.brand}
                      </Typography>

                      <Box>
                        {reservation.quantity > 1 && (
                          <Typography variant="caption" color="text.secondary">
                            ({formatCurrency(product?.price || 0)} un.)
                          </Typography>
                        )}
                      </Box>

                      <Box sx={styles.actions}>
                        <QuantityControl
                          productId={product?.id ?? reservation.productId}
                          currentQuantity={reservation.quantity}
                        />

                        <Box sx={styles.productTotal}>
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{ fontWeight: 700 }}
                          >
                            {formatCurrency(itemTotal)}
                          </Typography>

                          <Tooltip title="Remover item do pedido">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => removeFromCart(reservation.id)}
                              aria-label="Remover item"
                            >
                              <DeleteOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </Box>

        {items.length > 0 && (
          <Box sx={styles.footer}>
            <Box sx={styles.summaryRow}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {formatCurrency(totalPrice)}
              </Typography>
            </Box>

            <Box sx={styles.summaryRow}>
              <Typography variant="body2" color="text.secondary">
                Frete
              </Typography>
              <Typography
                variant="body2"
                color="success.main"
                sx={{ fontWeight: 600 }}
              >
                Grátis
              </Typography>
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Box sx={{ ...styles.summaryRow, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Total do Pedido
              </Typography>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                {formatCurrency(totalPrice)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isCheckingOut || items.length === 0}
              startIcon={
                isCheckingOut ? (
                  <CircularProgress size={20} color="inherit" />
                ) : undefined
              }
              sx={{
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
                py: 1.2,
              }}
              onClick={() => finalizeOrder()}
            >
              {isCheckingOut ? "Finalizando Pedido..." : "Finalizar Pedido"}
            </Button>
          </Box>
        )}
      </Drawer>

      <OrderSuccessDialog />

      <OrderFailDialog />
    </>
  );
}
