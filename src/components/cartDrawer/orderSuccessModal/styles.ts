export const styles = {
  dialog: { borderRadius: 3, p: 1, boxShadow: 8 },
  dialogTitle: { textAlign: "center", pt: 3, pb: 1 },
  dialogIcon: { fontSize: 64, color: "success.main", mb: 1 },
  dialogContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    p: 1.5,
    borderRadius: 2,
    mb: 2,
  },
  dialogOrderId: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  dialogListItem: {
    py: 0.8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dialogTax: { display: "flex", justifyContent: "space-between", mb: 0.5 },
  dialogTotal: { display: "flex", justifyContent: "space-between" },
  dialogActions: {
    p: 2,
    justifyContent: "center",
  },
  dialogActionsButton: {
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 700,
  },
};
