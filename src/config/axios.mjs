import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NOCODB_URL,
  headers: {
    "xc-token": process.env.NOCODB_API_TOKEN,
    accept: "application/json",
  },
});
