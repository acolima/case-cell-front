import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  CssBaseline,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CaseCellShop
          </Typography>
          <Button color="inherit" startIcon={<ShoppingCartIcon />}>
            Carrinho
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Encontre a capinha perfeita
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Proteção e estilo para o seu smartphone.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="secondary" size="large">
              Ver Catálogo
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
