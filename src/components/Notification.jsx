import React from "react";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uuid } from "../utils";
import { Close } from "../redux/reducers/notify";
const mapState = (state) => ({
  snackbar: state.notify.snackbar,
});

export default function Notification() {
  const dispatch = useDispatch();
  const { snackbar } = useSelector(mapState);
  const key = snackbar?.key || uuid();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (snackbar && snackbar?.message) {
      let variant = "info";
      if (snackbar.variant) {
        variant = snackbar.variant;
      }
      enqueueSnackbar(snackbar.message, {
        variant: variant,
        autoHideDuration: 5000,
        key,
        onExited: () => dispatch(Close(key)),
      });
    }
  }, [snackbar, enqueueSnackbar, key, dispatch]);

  return <></>;
}
