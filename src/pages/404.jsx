import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "50vh",
      }}
    >
      <Typography variant="h3" gutterBottom style={{ color: "black" }}>
        404 page not found
      </Typography>

      <Typography variant="body1" gutterBottom style={{ color: "black" }}>
        We are sorry but the page you are looking for does not exist.
      </Typography>

      <Link to={"/"}>Go to Home Page</Link>
    </Box>
  );
}
