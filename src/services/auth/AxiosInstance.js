import axios from "axios";

// create an axios instance to use with get/post/put/delete...
export const AxiosInstance = axios.create({
    baseURL: "https://api.freeapi.app/api/v1/",
    headers: { 'Content-Type': 'application/json' }  // Post an HTML form as JSON
})