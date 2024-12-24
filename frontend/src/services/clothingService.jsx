import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export const getAllClothing = async ({ subCategoryId = null, isTrending = null, name = null }) => {
    try {
        let queryParams = new URLSearchParams();
        if (subCategoryId) {
            queryParams.append("subCategoryId", subCategoryId);
        }
        if (isTrending !== null) {
            queryParams.append("isTrending", isTrending);
        }

        if (name) {
            queryParams.append("name", name);
        }

        const response = await axios.get(`${API_URL}/clothing/filter?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered clothing items:", error);
        throw error;
    }
};

export const createClothing = async (data) => {
    const response = await axios.post(`${API_URL}/clothing`, data);
    return response.data;
};

export const deleteClothing = async (id) => {
    const response = await axios.delete(`${API_URL}/clothing/${id}`);
    return response.data;
};

export const updateClothingTrending = async (id, isTrending) => {
    const response = await axios.patch(`${API_URL}/clothing/${id}`, { isTrending });
    return response.data;
};