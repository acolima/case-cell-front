import { CssBaseline } from "@mui/material";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Catalog from "./components/catalog";
import CartDrawer from "./components/cartDrawer";
import CartSnackbar from "./components/cartSnackbar";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <CssBaseline />

      <Navbar />

      <Hero />

      <Catalog />

      <CartDrawer />

      <CartSnackbar />
    </CartProvider>
  );
}

export default App;
