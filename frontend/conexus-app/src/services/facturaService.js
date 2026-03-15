import api from './api';

export const getFacturas = () => api.get('/facturas');
export const getFacturaById = (id) => api.get(`/facturas/${id}`);
export const getFacturasByCliente = (identificacion) => api.get(`/facturas/cliente/${identificacion}`);
export const getFacturasByEmisor = (identificacion) => api.get(`/facturas/emisor/${identificacion}`);
export const createFactura = (factura) => api.post('/facturas', factura);
export const updateFactura = (id, factura) => api.put(`/facturas/${id}`, factura);
export const deleteFactura = (id) => api.delete(`/facturas/${id}`);
export const addDetalle = (detalle) => api.post('/facturas/detalle', detalle);
export const deleteDetalle = (id) => api.delete(`/facturas/detalle/${id}`);
export const getDashboard = () => api.get('/facturas/dashboard');