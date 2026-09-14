import { CssBaseline } from "@mui/material";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Catalog from "./components/catalog";

function App() {
  return (
    <>
      <CssBaseline />

      <Navbar />

      <Hero />

      <Catalog />
    </>
  );
}

export default App;
