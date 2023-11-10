import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 2, position: "absolute", bottom: 0, width: "100%" }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <a color="inherit" href="#">
            Zurich Assignment
          </a>{" "}
          {new Date().getFullYear()}.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
