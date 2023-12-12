import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://167.99.62.218:5000/', 
  timeout: 5000, 
  
});


export const axiosGet = (url, params) => {
  return axiosInstance.get(url, { params });
};

export const axiosPost = (url, data) => {
  return axiosInstance.post(url, data);
};

export const axiosPut = (url, data) => {
  return axiosInstance.put(url, data);
};

export const axiosDelete = (url) => {
  return axiosInstance.delete(url);
};