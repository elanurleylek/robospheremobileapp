import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.robotikokulu.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor'ları
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // AsyncStorage kullanımı
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Kurs API fonksiyonları
export const coursesAPI = {
  getAllCourses: () => apiClient.get('/courses'),
  getCourseById: (id) => apiClient.get(`/courses/${id}`),
  enrollCourse: async (courseId) => {
    try {
      return await apiClient.post('/enrollments', { courseId });
    } catch (error) {
      console.error('Enroll error:', error.response?.data?.message || error.message);
      throw error;
    }
  },
};
