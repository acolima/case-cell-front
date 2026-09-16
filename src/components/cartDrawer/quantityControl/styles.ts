export const styles = {
  container: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #d0d7de",
    borderRadius: "4px",
    backgroundColor: "#f6f8fa",
    p: 0.3,
  },
  button: {
    p: 0.5,
    color: "text.secondary",
  },
  icon: { fontSize: 16 },
  inputContainer: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  },
  input: {
    textAlign: "center",
    width: 36,
    padding: "2px 0",
    fontSize: 13,
    fontWeight: 700,
  },
  loader: { position: "absolute", left: "calc(50% - 7px)" },
} as const;
