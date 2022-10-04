import auth, { initialState as authInit } from "./auth";
import article, { initialState as articleInit } from "./article";
import notify, { initialState as notifyInit } from "./notify";
import site, { initialState as siteInit } from "./site";

const rootReducer = {
  auth,
  article,
  notify,
  site,
};
export const initialState = {
  auth: authInit,
  article: articleInit,
  notify: notifyInit,
  site: siteInit,
};
export default rootReducer;
