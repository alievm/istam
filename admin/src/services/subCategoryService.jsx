import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSubCategories = async () => {
    const response = await axios.get(`${BASE_URL}/subcategories`);
    return response.data;
};

export const createSubCategory = async (subCategory) => {
    const response = await axios.post(`${BASE_URL}/subcategories`, subCategory);
    return response.data;
};

export const updateSubCategory = async (id, subCategory) => {
    const response = await axios.put(`${BASE_URL}/subcategories/${id}`, subCategory);
    return response.data;
};

export const deleteSubCategory = async (id) => {
    const response = await axios.delete(`${BASE_URL}/subcategories/${id}`);
    return response.data;
};
