interface Props {
  backgroundColor?: string;
  isSoldOut?: boolean;
}

export const styles = ({ backgroundColor, isSoldOut }: Props) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 3,
    transition: "transform 0.2s, box-shadow 0.2s",
    opacity: isSoldOut ? 0.9 : 1,
    filter: isSoldOut ? "grayscale(15%)" : "none",
    "&:hover": {
      transform: isSoldOut ? "none" : "translateY(-4px)",
      boxShadow: isSoldOut ? 2 : 6,
    },
  },
  media: {
    height: 180,
    backgroundColor: backgroundColor || "#e3f2fd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "64px",
    position: "relative",
  },
  chip: {
    backgroundColor: "#e64ce6ff",
    color: "#fff",
    position: "absolute",
    top: 12,
    right: 12,
    fontWeight: 700,
  },
  soldOutChip: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    position: "absolute",
    top: 12,
    left: 12,
    fontWeight: 700,
  },
  content: { flexGrow: 1 },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    mb: 1,
  },
  actions: { px: 2, pb: 2 },
  soldOutContainer: {
    width: "100%",
    py: 1,
    px: 2,
    backgroundColor: "#f5f5f5",
    borderRadius: 2,
    textAlign: "center",
    border: "1px dashed #bdbdbd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
});
