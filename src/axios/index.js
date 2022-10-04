import axios from "axios";

const instance = axios.create({
  baseURL: "http://34.245.213.76:3000",

  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")), //  set Authorization token
  },
});

export default instance;
