import { AppBar, Button, Toolbar, Typography, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/images/logo.png";
import { useCart } from "../../contexts/CartContext";
import { styles } from "./styles";

export default function Navbar() {
  const { openCart, totalReservedCount } = useCart();

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <img src={logo} alt="Logo" width={70} />

        <Typography variant="h6" component="div" sx={styles.title}>
          CaseCellShop
        </Typography>

        <Button
          color="primary"
          variant={totalReservedCount > 0 ? "contained" : "text"}
          onClick={openCart}
          sx={styles.button}
          startIcon={
            <Badge
              badgeContent={totalReservedCount}
              color="error"
              showZero={false}
              sx={styles.badge}
            >
              <ShoppingCartIcon />
            </Badge>
          }
        >
          Carrinho
        </Button>
      </Toolbar>
    </AppBar>
  );
}
