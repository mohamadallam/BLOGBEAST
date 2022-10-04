import React from "react";
import { Paper, Container, Typography, Box } from "@mui/material";
import Spinner from "../UI/Spinner";
export default function Index({
  loading = true,
  message = "Loading More Articles",
}) {
  return (
    <Container disableGutters maxWidth="sm" component="main">
      <Paper
        component="div"
        elevation={3}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {loading && (
          <Box sx={{ my: 2 }}>
            <Spinner />
          </Box>
        )}
        <Box sx={{ my: 2 }}>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            component="p"
          >
            {message}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
