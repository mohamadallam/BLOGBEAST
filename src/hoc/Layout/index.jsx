import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Copyright from "../../components/Copyright";
import useSite from "../../hooks/useSite";
import AppBar from "../../components/AppBar";
import { Box, Container } from "@mui/material";
export default function Layout(props) {
  const { loading } = useSite();
  return (
    <>
      {loading && (
        <LinearProgress
          color="secondary"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            zIndex: 1600,
          }}
        />
      )}
      <AppBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ minHeight: "70vh", width: "100%" }}>{props.children}</Box>
      </Container>
      <Copyright />
    </>
  );
}
