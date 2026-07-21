import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const analyzeConversation = async (conversation) => {
  const response = await axios.post(`${API_URL}/analyze`, {
    conversation
  });
  return response.data;
};
