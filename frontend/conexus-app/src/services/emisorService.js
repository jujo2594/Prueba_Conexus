import api from './api';

export const getEmisores = () => api.get('/emisores');
export const getEmisorById = (id) => api.get(`/emisores/${id}`);
export const createEmisor = (emisor) => api.post('/emisores', emisor);
export const updateEmisor = (id, emisor) => api.put(`/emisores/${id}`, emisor);
export const deleteEmisor = (id) => api.delete(`/emisores/${id}`);