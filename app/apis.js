// app/api.js
import axios from 'axios';
import { API_URL } from '@env'; // <- IMPORTANTE: usa @env para React Native con Expo

console.log('API_URL:', API_URL); 
// Instancia de axios con configuración base
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función GET genérica
export const get = (path, config = {}) => {
  return instance.get(path, config);
};

// Función POST genérica
export const post = (path, data, config = {}) => {
    console.log("DATA: ",data)
    console.log("PATH: ",path)
  return instance.post(path, data, config);
};

// También puedes agregar funciones PUT, DELETE si las necesitas:
export const put = (path, data, config = {}) => {
  return instance.put(path, data, config);
};

export const del = (path, config = {}) => {
  return instance.delete(path, config);
};


