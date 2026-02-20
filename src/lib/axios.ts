import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  //headers: { "Content-Type": "application/json",},
});

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers){ 
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
  
});