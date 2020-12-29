import axios from "axios";
import { getTheCookie } from "./cookies";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

let { _token } = getTheCookie({}, "_token");

export const callApi = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const callApiWithAuth = axios.create({
  headers: {
    Authorization: `Bearer ${_token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
