import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

export default function SignIn() {
  const dispatch = useDispatch();
  const { isAuth, error, loading } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    dispatch(signIn(data));
  };
  const errorMessage = error && error?.message ? error.message : null;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
                defaultValue={"candidate"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                defaultValue={"P@ssw0rd"}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}
