import { AppBar, Toolbar, Typography, Container, Grid } from "@mui/material";
import { ConnectionStatusUI } from "./components/ConnectionStatusUI";
import { UsersTable } from "./components/UsersTable";
import { AddUser } from "./components/AddUser";
import * as S from "./styles";

function App() {
  return (
    <S.AppContainer>
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography variant="h6" component="div">
                User Management App
              </Typography>
              <ConnectionStatusUI />
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <S.MainContainer component="main">
        <AddUser />
        <UsersTable />
      </S.MainContainer>
    </S.AppContainer>
  );
}

export default App;
