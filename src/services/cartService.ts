import api from "./api";
import type { Reservation } from "../domain/reservation";

export type CartAction = "increase" | "decrease" | "set";

export interface ReserveProductPayload {
  productId: number;
  clientId: string;
  quantity?: number;
  action?: CartAction;
}

export async function reserveProduct({
  productId,
  clientId,
  quantity = 1,
  action,
}: ReserveProductPayload): Promise<Reservation> {
  const response = await api.post<Reservation>("/cart", {
    productId,
    clientId,
    quantity,
    action,
  });

  return response.data;
}

export async function getCart(clientId: string): Promise<Reservation[]> {
  const response = await api.get<Reservation[]>(`/cart/${clientId}`);

  return response.data;
}

export async function cancelReservation(
  reservationId: string,
): Promise<Reservation> {
  const response = await api.delete<Reservation>(`/cart/${reservationId}`);

  return response.data;
}
