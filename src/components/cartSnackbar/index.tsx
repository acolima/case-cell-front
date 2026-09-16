import { Snackbar, Alert } from "@mui/material";
import { useCart } from "../../contexts/CartContext";

export default function CartSnackbar() {
  const { notification, closeNotification } = useCart();

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={closeNotification}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={closeNotification}
        severity={notification.severity}
        variant="filled"
        sx={{ width: "100%", boxShadow: 3 }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
}
