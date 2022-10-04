export class AuthError extends Error {}
export const apiError = (error) => {
  let message =
    error?.response?.data?.message ||
    "something went wrong!, please try again.";
  if (
    error.response.status === 401 &&
    error.response.data.message === "Unauthorized"
  ) {
    throw new AuthError(error.response.data.message);
  }

  if (handleNetworkError(error)) {
    message = handleNetworkError(error);
  }

  return { message };
};

export const handleNetworkError = (error) => {
  let msg = null;

  if (!window.navigator.onLine) {
    msg = "Your browser is offline.";
  } else if (error?.dueToNoInternetConnection) {
    msg = "No internet connection";
  }
  return msg;
};
