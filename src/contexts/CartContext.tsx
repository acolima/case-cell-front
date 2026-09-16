import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, Reservation } from "../domain/reservation";
import type { Product } from "../domain/product";
import {
  getCart,
  reserveProduct,
  cancelReservation,
  type CartAction,
} from "../services/cartService";
import { getClientId } from "../utils/clientId";

interface CartNotification {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface CartContextData {
  items: CartItem[];
  totalReservedCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  isLoading: boolean;
  catalogRefreshKey: number;
  orderExpiresAt: string | undefined;
  notification: CartNotification;
  openCart: () => void;
  closeCart: () => void;
  closeNotification: () => void;
  addToCart: (product: Product, quantity?: number) => Promise<boolean>;
  updateItemQuantity: (
    productId: number,
    quantity: number,
    action?: CartAction,
  ) => Promise<boolean>;
  removeFromCart: (reservationId: string) => Promise<void>;
  handleOrderExpired: () => Promise<void>;
  isProductReserved: (productId: number) => boolean;
  triggerCatalogRefresh: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CART_ITEMS_CACHE_KEY = "casecell_cart_cache";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const cached = localStorage.getItem(CART_ITEMS_CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [catalogRefreshKey, setCatalogRefreshKey] = useState(0);
  const [notification, setNotification] = useState<CartNotification>({
    open: false,
    message: "",
    severity: "success",
  });

  const clientId = getClientId();

  const triggerCatalogRefresh = useCallback(() => {
    setCatalogRefreshKey((prev) => prev + 1);
  }, []);

  const saveItems = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(CART_ITEMS_CACHE_KEY, JSON.stringify(newItems));
    } catch {}
  }, []);

  const syncWithBackend = useCallback(async () => {
    try {
      const backendReservations = await getCart(clientId);
      if (backendReservations && Array.isArray(backendReservations)) {
        setItems((currentItems) => {
          const updated: CartItem[] = backendReservations.map(
            (res: Reservation) => {
              const existing = currentItems.find(
                (item) =>
                  item.reservation.id === res.id ||
                  item.reservation.productId === res.productId,
              );

              return {
                reservation: res,
                product: existing?.product ?? {
                  id: res.productId,
                  name: `Capinha #${res.productId}`,
                  model: "Smartphone",
                  brand: "Universal",
                  price: 39.9,
                  rating: 5,
                  reviews: 1,
                  color: "#f3e5f5",
                },
              };
            },
          );

          localStorage.setItem(CART_ITEMS_CACHE_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      console.warn(
        "Não foi possível sincronizar o carrinho com o backend:",
        err,
      );
    }
  }, [clientId]);

  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const isProductReserved = useCallback(
    (productId: number): boolean => {
      return items.some(
        (item) =>
          item.product?.id === productId ||
          item.reservation?.productId === productId,
      );
    },
    [items],
  );

  const addToCart = async (
    product: Product,
    quantity = 1,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      let reservation: Reservation;

      try {
        reservation = await reserveProduct({
          productId: product.id,
          clientId,
          quantity,
          action: "increase",
        });
      } catch (apiError: any) {
        const errorMsg =
          apiError?.response?.data?.message ||
          apiError?.message ||
          "Erro ao reservar produto no servidor.";

        setNotification({
          open: true,
          message: errorMsg,
          severity: "error",
        });
      }

      const expiresAtString =
        typeof reservation.expiresAt === "string"
          ? reservation.expiresAt
          : new Date(reservation.expiresAt).toISOString();

      setItems((currentItems) => {
        let found = false;
        const updated = currentItems.map((item) => {
          const isSameItem =
            item.reservation.id === reservation.id ||
            item.reservation.productId === reservation.productId;

          if (isSameItem) {
            found = true;
            return {
              product,
              reservation: {
                ...reservation,
                quantity: reservation.quantity,
                expiresAt: expiresAtString,
              },
            };
          }

          return {
            ...item,
            reservation: {
              ...item.reservation,
              expiresAt: expiresAtString,
            },
          };
        });

        if (!found) {
          updated.push({
            reservation: {
              ...reservation,
              expiresAt: expiresAtString,
            },
            product,
          });
        }

        try {
          localStorage.setItem(CART_ITEMS_CACHE_KEY, JSON.stringify(updated));
        } catch {}

        return updated;
      });

      triggerCatalogRefresh();

      setNotification({
        open: true,
        message: `"${product.name}" reservado no carrinho com sucesso!`,
        severity: "success",
      });

      return true;
    } catch (err: any) {
      setNotification({
        open: true,
        message: err.message || "Erro inesperado ao reservar o produto.",
        severity: "error",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Atualiza a quantidade de um item no carrinho:
   * action:
   * - "increase": adiciona quantity
   * - "decrease": subtrai quantity
   * - "set": define o valor exato quantity
   */
  const updateItemQuantity = async (
    productId: number,
    quantity: number,
    action: CartAction = "set",
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      let reservation: Reservation;

      try {
        reservation = await reserveProduct({
          productId,
          clientId,
          quantity,
          action,
        });
      } catch (apiError: any) {
        const errorMsg =
          apiError?.response?.data?.message ||
          apiError?.message ||
          "Erro ao atualizar quantidade no servidor.";

        setNotification({
          open: true,
          message: errorMsg,
          severity: "error",
        });
        return false;
      }

      const expiresAtString =
        typeof reservation.expiresAt === "string"
          ? reservation.expiresAt
          : new Date(reservation.expiresAt).toISOString();

      setItems((currentItems) => {
        let updated: CartItem[];

        if (reservation.quantity <= 0) {
          updated = currentItems.filter(
            (item) =>
              item.reservation.id !== reservation.id &&
              item.reservation.productId !== productId,
          );
        } else {
          updated = currentItems.map((item) => {
            const isTarget =
              item.reservation.id === reservation.id ||
              item.reservation.productId === productId;

            if (isTarget) {
              return {
                ...item,
                reservation: {
                  ...item.reservation,
                  quantity: reservation.quantity,
                  expiresAt: expiresAtString,
                },
              };
            }

            return {
              ...item,
              reservation: {
                ...item.reservation,
                expiresAt: expiresAtString,
              },
            };
          });
        }

        try {
          localStorage.setItem(CART_ITEMS_CACHE_KEY, JSON.stringify(updated));
        } catch {}

        return updated;
      });

      triggerCatalogRefresh();

      if (reservation.quantity <= 0) {
        setNotification({
          open: true,
          message: "Item removido do carrinho.",
          severity: "info",
        });
      }

      return true;
    } catch (err: any) {
      setNotification({
        open: true,
        message: err.message || "Erro inesperado ao atualizar quantidade.",
        severity: "error",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (reservationId: string) => {
    try {
      try {
        await cancelReservation(reservationId);
      } catch (err) {
        console.warn("Não foi possível cancelar reserva no backend:", err);
      }

      const updated = items.filter(
        (item) => item.reservation.id !== reservationId,
      );
      saveItems(updated);
      triggerCatalogRefresh();

      setNotification({
        open: true,
        message: "Item removido e produto devolvido ao catálogo.",
        severity: "info",
      });
    } catch (err: any) {
      setNotification({
        open: true,
        message: "Erro ao remover reserva.",
        severity: "error",
      });
    }
  };

  const handleOrderExpired = async () => {
    saveItems([]);
    triggerCatalogRefresh();

    setNotification({
      open: true,
      message:
        "O tempo do seu pedido expirou! Todos os itens reservados foram liberados de volta ao estoque.",
      severity: "warning",
    });
  };

  const totalReservedCount = items.reduce(
    (total, item) => total + (item.reservation.quantity || 1),
    0,
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total + (item.product?.price || 0) * (item.reservation.quantity || 1),
    0,
  );

  const orderExpiresAt =
    items.length > 0 ? items[0]?.reservation.expiresAt : undefined;

  return (
    <CartContext.Provider
      value={{
        items,
        totalReservedCount,
        totalPrice,
        isCartOpen,
        isLoading,
        catalogRefreshKey,
        orderExpiresAt,
        notification,
        openCart,
        closeCart,
        closeNotification,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        handleOrderExpired,
        isProductReserved,
        triggerCatalogRefresh,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
