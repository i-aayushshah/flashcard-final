import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Full URL pointing to the Flask backend
});

export const getFlashcards = () => api.get('/flashcards').then(res => res.data);
export const createFlashcard = (data) => api.post('/flashcards', data).then(res => res.data);
export const updateFlashcard = (id, data) => api.put(`/flashcards/${id}`, data).then(res => res.data);
export const deleteFlashcard = (id) => api.delete(`/flashcards/${id}`).then(res => res.data);
