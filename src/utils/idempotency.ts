export function generateIdempotencyKey(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}
