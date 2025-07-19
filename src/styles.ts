import { Box, Container, styled, type ContainerProps } from "@mui/material";

const AppContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
}));

const MainContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
}));

export { AppContainer, MainContainer };
