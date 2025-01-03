import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

export const getVotes = async () => {
    const response = await axios.get(`${API_URL}/votes`);
    return response.data;
};

export const createVote = async (data) => {
    const response = await axios.post(`${API_URL}/votes/create-vote`, data);
    return response.data;
};

export const updateVote = async (id, data) => {
    const response = await axios.put(`${API_URL}/votes/vote`, { id, ...data });
    return response.data;
};

export const deleteVote = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/votes/delete/${id}`);
        console.log('Vote deleted:', response.data); // Логируем ответ
        return response.data;
    } catch (error) {
        console.error('Error deleting vote:', error.response || error); // Логируем ошибку
    }
};

export const toggleVoteActiveStatus = async (id, isActive) => {
    try {
        const response = await axios.put(`${API_URL}/votes/toggle-active/${id}`, { isActive });
        return response.data;
    } catch (error) {
        console.error('Error toggling vote active status:', error);
    }
};