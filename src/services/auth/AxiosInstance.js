import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: "https://api.freeapi.app/api/v1/",
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }  // Post an HTML form as JSON
})