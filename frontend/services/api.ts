import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.165.95.1:8080/api" // Replace with your IP address
    : "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
