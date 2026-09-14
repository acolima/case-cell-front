import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "../../assets/images/logo.png";
import { styles } from "./styles";

export default function Navbar() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <img src={logo} alt="Logo" width={70} />

        <Typography variant="h6" component="div" sx={styles.title}>
          CaseCellShop
        </Typography>
        <Button color="primary" startIcon={<ShoppingCartIcon />}>
          Carrinho
        </Button>
      </Toolbar>
    </AppBar>
  );
}
