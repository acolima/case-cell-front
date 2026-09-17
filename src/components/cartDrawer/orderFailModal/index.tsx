import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useCart } from "../../../contexts/CartContext";
import { styles } from "./styles";

export default function OrderFailDialog() {
  const { failedOrder, clearOrder } = useCart();

  if (!failedOrder?.message) return null;

  return (
    <Dialog
      open={Boolean(failedOrder.message)}
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
        <ErrorOutlineOutlinedIcon sx={styles.dialogIcon} />
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Erro!</Typography>
        <Typography variant="body2" color="text.secondary">
          {failedOrder.message}
        </Typography>
      </DialogTitle>

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
