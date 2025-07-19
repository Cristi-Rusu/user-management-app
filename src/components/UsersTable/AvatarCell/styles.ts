import { Avatar, Box, styled } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const CellContainer = styled(Box)(() => ({
  height: "100%",
  alignItems: "center",
  justifyContent: "end",
  display: "flex",
}));

const UserAvatar = styled(Avatar)(() => ({
  width: 32,
  height: 32,
  backgroundColor: blueGrey[300],
  color: blueGrey[900],
}));

export { CellContainer, UserAvatar };
