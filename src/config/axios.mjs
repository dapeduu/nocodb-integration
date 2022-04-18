import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NOCODB_URL,
  headers: {
    contentType: "application/json",
    "xc-auth": process.env.NOCODB_AUTH_TOKEN,
  },
});
