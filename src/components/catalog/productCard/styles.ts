interface Props {
  backgroundColor?: string;
}

export const styles = ({ backgroundColor }: Props) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 3,
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 6,
    },
  },
  media: {
    height: 180,
    backgroundColor,
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
  content: { flexGrow: 1 },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    mb: 1,
  },
  actions: { px: 2, pb: 2 },
});
