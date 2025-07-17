import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { ConnectionStatus } from "./components/ConnectionStatus";

function App() {
  return (
    <Box flex={1}>
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <Container>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6" component="div">
                User Management App
              </Typography>
              <ConnectionStatus />
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
      <Container></Container>
    </Box>
  );
}

export default App;
