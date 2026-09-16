import {
  useState,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import {
  Box,
  IconButton,
  InputBase,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../../contexts/CartContext";
import { styles } from "./styles";

interface QuantityControlProps {
  productId: number;
  currentQuantity: number;
}

export default function QuantityControl({
  productId,
  currentQuantity,
}: QuantityControlProps) {
  const { updateItemQuantity } = useCart();
  const [inputValue, setInputValue] = useState<string>(String(currentQuantity));
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setInputValue(String(currentQuantity));
  }, [currentQuantity]);

  const handleApplyExactValue = async () => {
    const trimmed = inputValue.trim();
    const parsed = parseInt(trimmed, 10);

    if (isNaN(parsed) || parsed < 0) {
      setInputValue(String(currentQuantity));
      return;
    }

    if (parsed === currentQuantity) {
      return;
    }

    setIsUpdating(true);
    try {
      const success = await updateItemQuantity(productId, parsed, "set");
      if (!success) {
        setInputValue(String(currentQuantity));
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyExactValue();
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (/^\d*$/.test(val)) {
      setInputValue(val);
    }
  };

  const handleBlur = () => {
    handleApplyExactValue();
  };

  const handleIncrease = async () => {
    setIsUpdating(true);
    try {
      await updateItemQuantity(productId, 1, "increase");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDecrease = async () => {
    if (currentQuantity <= 0) return;
    setIsUpdating(true);
    try {
      await updateItemQuantity(productId, 1, "decrease");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div style={styles.container}>
      <Tooltip
        title={
          currentQuantity <= 1 ? "Remover do carrinho" : "Diminuir quantidade"
        }
      >
        <span>
          <IconButton
            size="small"
            onClick={handleDecrease}
            disabled={isUpdating}
            sx={styles.button}
            aria-label="Diminuir"
          >
            <RemoveIcon sx={styles.icon} />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Digite a quantidade e pressione Enter">
        <Box sx={styles.inputContainer}>
          <InputBase
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={isUpdating}
            inputProps={{
              style: styles.input,
              "aria-label": "Quantidade exata",
            }}
          />
          {isUpdating && <CircularProgress size={14} sx={styles.loader} />}
        </Box>
      </Tooltip>

      <Tooltip title="Aumentar quantidade">
        <span>
          <IconButton
            size="small"
            onClick={handleIncrease}
            disabled={isUpdating}
            sx={styles.button}
            aria-label="Aumentar"
          >
            <AddIcon sx={styles.icon} />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}
