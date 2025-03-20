import axios from 'axios';
import { CodeAnalysisResult } from '../types';

const API_URL = 'http://localhost:8000/api';

export const analyzeCode = async (code: string, language: string): Promise<CodeAnalysisResult> => {
  try {
    const response = await axios.post(`${API_URL}/analyze`, {
      code,
      language,
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
};