import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { UsersTable } from "./components/UsersTable";

function App() {
  return (
    <Box display="flex" flexDirection="column" flex={1} minHeight={0}>
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
              <ConnectionStatus />
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Container
        sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      >
        <UsersTable />
      </Container>
    </Box>
  );
}

export default App;
