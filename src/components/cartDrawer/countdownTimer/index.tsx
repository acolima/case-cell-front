import { useState, useEffect } from "react";
import { Chip, Tooltip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import { styles } from "./styles";

interface CountdownTimerProps {
  expiresAt: string | Date;
  onExpire?: () => void;
}

export default function CountdownTimer({
  expiresAt,
  onExpire,
}: CountdownTimerProps) {
  const calculateRemaining = () => {
    const targetTime = new Date(expiresAt).getTime();
    const now = Date.now();
    return Math.max(0, Math.floor((targetTime - now) / 1000));
  };

  const [remainingSeconds, setRemainingSeconds] =
    useState<number>(calculateRemaining);

  useEffect(() => {
    setRemainingSeconds(calculateRemaining());

    const interval = setInterval(() => {
      const remaining = calculateRemaining();
      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const isExpired = remainingSeconds <= 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  const getColor = (): "error" | "warning" | "success" => {
    if (isExpired) return "error";
    if (remainingSeconds <= 120) return "error";
    if (remainingSeconds <= 300) return "warning";
    return "success";
  };

  const getTooltipTitle = () => {
    if (isExpired) {
      return "Esta reserva expirou e o produto voltou ao estoque.";
    }
    return `Reserva garantida por mais ${formattedTime}. Finalize o pedido antes que expire!`;
  };

  return (
    <Tooltip title={getTooltipTitle()}>
      <Chip
        icon={
          isExpired ? (
            <TimerOffIcon sx={{ fontSize: "14px !important" }} />
          ) : (
            <AccessTimeIcon sx={{ fontSize: "14px !important" }} />
          )
        }
        label={isExpired ? "Expirada" : `Expira em ${formattedTime}`}
        size="small"
        color={getColor()}
        variant={isExpired ? "filled" : "outlined"}
        sx={styles.chip}
      />
    </Tooltip>
  );
}
