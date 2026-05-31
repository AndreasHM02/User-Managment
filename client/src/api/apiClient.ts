import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5036/api"
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

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