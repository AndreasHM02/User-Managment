import axios from "axios";
import { logger } from "../utils/logger";

const api = axios.create({
    baseURL: "http://localhost:5036/api"
});

api.interceptors.request.use(config => {
    const start = Date.now();
    config.metadata = { startTime: start };
    const token = localStorage.getItem("token");

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    logger.info(`[API] [${config.method?.toUpperCase()}] ${config.url}`);

    return config;
});

api.interceptors.response.use(
    
    res => {
        const duration = Date.now() - (res.config.metadata?.startTime || 0);
        const method = res.config.method?.toUpperCase() || "UNKNOWN";
        const url = res.config.url || "UNKNOWN";
        const status = res.status;
        const slowTag = duration > 300 ? " ⚠️ SLOW" : "";

        logger.info(`[API] [${method}] ${url} → ${status} (${duration} ms)${slowTag}`);
        return res;
    },
    err => {
        const duration = Date.now() - (err.config?.metadata.startTime || 0);
        logger.error(`[API] [${err.config?.method?.toUpperCase()}] ${err.config?.url} → ${err.response?.status}`, err.message, `(${duration} ms)`);
        return Promise.reject(err);
    }
);

export default api;

// Genenric request functions
const get = async <T>(url: string): Promise<T> => {
    const res = await api.get<T>(url);
    return res.data;
};

const post = async <T>(url: string, data: unknown): Promise<T> => {
    const res = await api.post<T>(url, data);
    return res.data;
};

const put = async <T>(url: string, data: unknown): Promise<T> => {
    const res = await api.put<T>(url, data);
    return res.data;
};

const del = async <T>(url: string): Promise<T> => {
    const res = await api.delete<T>(url);
    return res.data;
};


export const apiClient = {
    get,
    post,
    put,
    del
}