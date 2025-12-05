import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.100.9:8080/api"
    : "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
