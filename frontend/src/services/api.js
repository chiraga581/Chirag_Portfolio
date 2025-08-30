import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data part
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// API service functions
export const portfolioAPI = {
  // Skills
  getSkills: async () => {
    const response = await apiClient.get('/skills');
    return response.data || [];
  },

  // Projects
  getProjects: async () => {
    const response = await apiClient.get('/projects'); 
    return response.data || [];
  },

  getProject: async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  },

  // Experience
  getExperience: async () => {
    const response = await apiClient.get('/experience');
    return response.data || [];
  },

  // Education
  getEducation: async () => {
    const response = await apiClient.get('/education');
    return response.data || [];
  },

  // Certifications
  getCertifications: async () => {
    const response = await apiClient.get('/certifications');
    return response.data || [];
  },

  // Contact
  submitContact: async (contactData) => {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  },

  // Admin: Get all contacts
  getContacts: async () => {
    const response = await apiClient.get('/contacts');
    return response.data || [];
  }
};

export default portfolioAPI;