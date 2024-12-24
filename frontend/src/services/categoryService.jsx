import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
};

export const createCategory = async (category) => {
    const response = await axios.post(`${BASE_URL}/categories`, category);
    return response.data;
};

export const updateCategory = async (id, category) => {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, category);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`);
    return response.data;
};
