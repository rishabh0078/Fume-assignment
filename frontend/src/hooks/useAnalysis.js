import { useState } from 'react';
import { analyzeConversation } from '../services/api.js';

export const useAnalysis = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (conversation) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeConversation(conversation);
      setData(result);
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Failed to analyze conversation.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, analyze };
};
