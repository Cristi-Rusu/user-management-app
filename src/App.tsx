import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";

function App() {
  return (
    <Box flex={1}>
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <Container>
            <Typography variant="h6" component="div">
              User Management App
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container></Container>
    </Box>
  );
}

export default App;
