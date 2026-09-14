import { Box, Typography } from "@mui/material";
import { styles } from "./styles";

export default function Hero() {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>
        Encontre a capinha perfeita 🛡️
      </Typography>
      <Typography variant="subtitle1">
        Proteção, estilo e qualidade para o seu smartphone.
      </Typography>
    </Box>
  );
}
