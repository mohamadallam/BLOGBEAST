import React from "react";
import Typography from "@mui/material/Typography";
import useSite from "../../hooks/useSite";

export default function Copyright(props) {
  const { name } = useSite();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{ height: 50 }}
    >
      {"Copyright © "}
      {name + " "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
