// services/newsService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;


export const fetchNews = async () => {
    try {
        const response = await axios.get(`${API_URL}/news`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch news.");
    }
};
