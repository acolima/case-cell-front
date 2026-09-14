import { Box, Button } from "@mui/material";
import { brands } from "../../../mocks/brands";
import { styles } from "./styles";

interface FiltersProps {
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
}

export default function Filters({
  selectedBrand,
  setSelectedBrand,
}: FiltersProps) {
  return (
    <Box sx={styles.container}>
      {brands.map((brand) => (
        <Button
          key={brand}
          variant={selectedBrand === brand ? "contained" : "outlined"}
          color="primary"
          onClick={() => setSelectedBrand(brand)}
          sx={styles.button}
        >
          {brand}
        </Button>
      ))}
    </Box>
  );
}
