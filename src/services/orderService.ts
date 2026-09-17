import api from "./api";
import type { Order } from "../domain/order";

export interface CheckoutOptions {
  idempotencyKey?: string;
  simulateErpError?: boolean;
  simulateErpDelayMs?: number;
}

export async function checkoutOrder(
  clientId: string,
  options: CheckoutOptions = {},
): Promise<Order> {
  const { idempotencyKey, simulateErpError, simulateErpDelayMs } = options;

  const headers: Record<string, string> = {};
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const payload = {
    clientId,
    idempotencyKey,
    simulateErpError,
    simulateErpDelayMs,
  };

  try {
    const response = await api.post<Order>("/orders/checkout", payload, {
      headers,
    });
    return response.data;
  } catch (err: any) {
    throw err;
  }
}

export async function getOrders(clientId?: string): Promise<Order[]> {
  try {
    const response = await api.get<Order[]>("/orders", {
      params: clientId ? { clientId } : undefined,
    });
    return response.data;
  } catch (err: any) {
    throw err;
  }
}
