import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRedirect } from "../redux/reducers/auth";
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};
const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(mapState);
  const isAuth = Boolean(auth?.token);

  useEffect(() => {
    if (isAuth && auth?.redirect) {
      navigate(auth?.redirect);
      dispatch(setRedirect(null));
    }
  }, [auth, navigate, dispatch, isAuth]);

  return { ...auth, isAuth };
};
export default useAuth;
