import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import useSite from "../../hooks/useSite";
import NavItems from "./NavItems";
import { AppBar, Container } from "@mui/material";

export default function Index() {
  const site = useSite();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {site.name}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <NavItems />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
