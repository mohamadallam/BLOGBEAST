import React from "react";
// notistack
import { SnackbarProvider } from "notistack";
// material ThemeProvider
import { ThemeProvider } from "@mui/material/styles";
import Notification from "./components/Notification";
// Layouts
import Layout from "./hoc/Layout";
// routes
import Routes from "./routes";
import theme from "./theme";

import setUpInterceptor from "./axios/interceptor";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  setUpInterceptor(dispatch); //<-- initialize the interceptor
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={4} preventDuplicate>
        <Notification />
        <Layout>
          <Routes />
        </Layout>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
