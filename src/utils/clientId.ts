const CLIENT_ID_STORAGE_KEY = "casecell_client_id";

export function getClientId(): string {
  let clientId = localStorage.getItem(CLIENT_ID_STORAGE_KEY);

  if (!clientId) {
    clientId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    localStorage.setItem(CLIENT_ID_STORAGE_KEY, clientId);
  }

  return clientId;
}
