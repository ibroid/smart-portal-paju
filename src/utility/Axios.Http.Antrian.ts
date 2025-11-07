import axios from 'axios';
import { ANTRIAN_REST_API_KEY, ANTRIAN_REST_API_URL } from "@env";

// Membuat instance axios dengan konfigurasi dasar
const xhttp = axios.create({
  baseURL: ANTRIAN_REST_API_URL, // Ganti dengan base URL yang kamu butuhkan
  timeout: 10000, // Timeout jika request terlalu lama (dalam milisecond)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${ANTRIAN_REST_API_KEY}`, // Jika ada token yang perlu disertakan
  },
});

// Bisa tambahkan interceptors jika diperlukan
xhttp.interceptors.request.use(
  (config) => {
    // Lakukan sesuatu sebelum request dikirim
    return config;
  },
  (error) => {
    // Tangani error request
    return Promise.reject(error);
  }
);

xhttp.interceptors.response.use(
  (response) => {
    // Tangani response yang sukses
    return response;
  },
  (error) => {
    // Tangani response yang gagal
    return Promise.reject(error);
  }
);

export default xhttp;