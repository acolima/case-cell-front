import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  List,
  ListItem,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useCart } from "../../../contexts/CartContext";
import { styles } from "./styles";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function OrderSuccessDialog() {
  const { completedOrder, clearOrder } = useCart();

  if (!completedOrder) return null;

  return (
    <Dialog
      open={Boolean(completedOrder)}
      onClose={() => {}}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: styles.dialog,
        },
      }}
    >
      <DialogTitle sx={styles.dialogTitle}>
        <CheckCircleOutlinedIcon sx={styles.dialogIcon} />
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
          Pedido Confirmado!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Seu pedido foi processado com sucesso. Em breve você receberá o email
          de confirmação.
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 2 }}>
        <Box sx={styles.dialogContent}>
          <Box sx={styles.dialogOrderId}>
            <ReceiptLongIcon color="primary" fontSize="small" />
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block" }}
              >
                ID DO PEDIDO
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                #{completedOrder.id.slice(0, 8)}
              </Typography>
            </Box>
          </Box>

          <Chip
            label="CONFIRMADO"
            color="success"
            size="small"
            sx={{ fontWeight: 700 }}
          />
        </Box>

        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Itens Comprados
        </Typography>

        <List disablePadding>
          {completedOrder.items.map((item, index) => (
            <ListItem key={index} disableGutters sx={styles.dialogListItem}>
              <Box sx={{ pr: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Quantidade: {item.quantity} un. ({formatCurrency(item.price)}{" "}
                  un.)
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
              >
                {formatCurrency(item.subtotal)}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={styles.dialogTax}>
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

        <Box sx={styles.dialogTotal}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Total Pago
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            {formatCurrency(completedOrder.total)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={styles.dialogActions}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={clearOrder}
          sx={styles.dialogActionsButton}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
