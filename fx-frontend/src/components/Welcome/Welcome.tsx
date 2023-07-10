import { Box, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <div>
      <Box sx={{ mt: 25, textAlign: "center" }}>
        <Typography variant="h4">Welcome to FX</Typography>
        <Typography variant="h5">
          This is a demo app for FX Company, use the navbar to navigate 🚀
        </Typography>
      </Box>
    </div>
  );
};
export { Welcome };
