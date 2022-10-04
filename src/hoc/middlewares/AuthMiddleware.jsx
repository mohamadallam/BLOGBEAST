import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { setRedirect } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";

export default function AuthMiddleware(props) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.isAuth) {
      dispatch(setRedirect(window.location.pathname));
      navigate("/login");
    }
  }, [navigate, auth, dispatch]);
  if (!auth?.isAuth) {
    return <></>;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
}
