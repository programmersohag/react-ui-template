import type {ApiError} from "../dto/ApiError.ts";
import type {ApiResponse} from "../dto/ApiResponse.ts";
import {getAccessToken, getRefreshToken, setAccessToken, clearTokens} from "./auth";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Notify all queued requests once refresh is done
function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubscribers.push(cb);
}

function onTokenRefreshed(token: string) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

async function refreshToken(): Promise<string> {
    if (isRefreshing) {
        return new Promise((resolve) => {
            subscribeTokenRefresh(resolve);
        });
    }

    isRefreshing = true;

    const refresh = getRefreshToken();
    if (!refresh) {
        clearTokens();
        window.location.href = "/login";
        throw new Error("No refresh token available");
    }

    try {
        const res = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({refreshToken: refresh}),
        });

        if (!res.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await res.json();
        setAccessToken(data.accessToken);

        isRefreshing = false;
        onTokenRefreshed(data.accessToken);

        return data.accessToken;
    } catch (err) {
        isRefreshing = false;
        clearTokens();
        window.location.href = "/login";
        throw err;
    }
}

export async function apiClient<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    let token = getAccessToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string> || {}),
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response = await fetch(url, {...options, headers});
    // Handle 401 → try refresh
    if (response.status === 401) {
        token = await refreshToken();
        // Retry original request with new token
        const retryHeaders = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
        response = await fetch(url, {...options, headers: retryHeaders});
    }

    if (!response.ok) {
        const error: ApiError = new Error("Request failed");
        error.status = response.status;
        try {
            error.data = await response.json();
        } catch {
            error.data = null;
        }
        throw error;
    }

    const resp = (await response.json()) as ApiResponse<T>;
    return resp.getData();
}