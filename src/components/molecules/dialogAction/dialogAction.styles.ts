import { GRAY_100 } from "@/styles/colors";

export const dialogAction = {
  padding: 2.5,
  backgroundColor: GRAY_100,
  gap: 1,
};

export const dialogActionBox = {
  display: "flex",
  gap: 1,
  width: { xs: "100%", sm: "80%" },
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: { xs: "stretch", sm: "flex-end" },
  ml: { sm: "auto" },
};
