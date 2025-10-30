/// store access token and refresh token in state using Zustand

import { create } from 'zustand'

// create custom hook to store tokens
export const useAuthStore = create((set) => ({
    // retrieve tokens from local storage
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    // save tokens to local storage
    setTokens: ({ accessToken, refreshToken }) => {
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        set({ accessToken, refreshToken });
    },
    clearTokens: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ accessToken: null, refreshToken: null });
    }
})
);