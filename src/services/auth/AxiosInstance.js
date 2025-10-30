import axios from "axios";

// create an axios instance to use with get/post/put/delete...
export const AxiosInstance = axios.create({
    baseURL: "https://api.freeapi.app/api/v1/",
    headers: {
        'Content-Type': 'application/json', // Post an HTML form as JSON
        // Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`, // authorize for logging out
    }
})

// use interceptor to add accessToken in case accessToken is expired and refreshToken still available
AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
)

// response interceptor to hanlde token refresh
AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // if error 401 and NOT have already retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // get new accessToken and save to localStorage
                const refreshToken = localStorage.getItem("refreshToken");
                const res = await AxiosInstance.post('https://api.freeapi.app/api/v1/users/refresh-token', { refreshToken });
                const { accessToken } = res.data.data;
                localStorage.setItem("accessToken", accessToken);
                // update accessToken to Axious header data
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return originalRequest;
            } catch (err) {
                window.location.href = '/login';
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);
            }
        }
        // return any other error
        return Promise.reject(error);
    }
)