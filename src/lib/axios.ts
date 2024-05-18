import axios, { type AxiosRequestConfig } from "axios"

const config: AxiosRequestConfig = {
  baseURL: "http://localhost:3001/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
}

export const instance = axios.create(config)
