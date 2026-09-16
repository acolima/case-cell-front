export function formatCurrency(price: number) {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}
