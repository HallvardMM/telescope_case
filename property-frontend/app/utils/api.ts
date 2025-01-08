import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const api = axios.create({
    baseURL: BASE_URL,
});

export const getUsers = async () => {
    const response = await api.get("users/");
    return response.data;
};

export const getPortfolios = async () => {
    const response = await api.get("portfolios/");
    return response.data;
};

export const createPortfolio = async (data: any) => {
    const response = await api.post("portfolios/", data);
    return response.data;
};
