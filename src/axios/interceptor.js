import instance from ".";
import { setLoading, setError } from "../redux/reducers/site";
import { Push } from "../redux/reducers/notify";
import { apiError, AuthError } from "../utils";
import { signOut } from "../redux/reducers/auth";

const setUpInterceptor = (dispatch) => {
  const onError = async (error) => {
    let errorResult = {
      message: error?.message,
    };
    let isAuthError = false;
    try {
      errorResult = apiError(error);
    } catch (error) {
      // catch authentication error
      if (error instanceof AuthError) {
        isAuthError = true;
        dispatch(signOut());
      }
    } finally {
      if (!isAuthError) {
        dispatch(Push({ message: errorResult.message, variant: "error" }));
      }

      dispatch(setLoading(false));
      dispatch(setError(errorResult));
    }
    return Promise.reject(error);
  };
  const onRequest = (config) => {
    // toggle loading before request is sent
    dispatch(setLoading(true));
    dispatch(setError(null));

    const token = JSON.parse(localStorage.getItem("token"));
    config.headers = {
      Authorization: `Bearer ${token}`, //  update  Authorization token to  every axios call
    };
    return config;
  };
  const onResponse = (res) => {
    // toggle loading after response received
    dispatch(setLoading(false));
    dispatch(setError(null));
    return res;
  };
  instance.interceptors.request.use(onRequest, onError);

  instance.interceptors.response.use(onResponse, onError);
};

export default setUpInterceptor;
