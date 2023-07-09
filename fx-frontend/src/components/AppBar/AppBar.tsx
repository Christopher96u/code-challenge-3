import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants";
const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex" },
              justifyContent: { xs: "center" },
            }}
          >
            {routes.map((route) => (
              <Button
                color="success"
                size="small"
                key={route.path}
                sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                variant="contained"
                onClick={() => navigate(route.path)}
              >
                {route.displayName}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { ResponsiveAppBar };
