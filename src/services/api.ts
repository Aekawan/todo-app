import axios from 'axios';
import nookies from 'nookies';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'https://todo-app-api-ochre.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('/auth/login')) {
      const token = nookies.get(null).token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get(`/users/profile`);
  return response.data;
};

export const getAllTodos = async (context?: any) => {
  let token: string | null = null;

  if (typeof window === 'undefined') {
    if (context) {
      const cookies = nookies.get(context);
      token = cookies.token;
    }
  } else {
    token = nookies.get(null).token;
  }

  if (token) {
    const response = await axios.get(`${API_BASE_URL}/todos/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } else {
    throw new Error('No token found');
  }
};

export const getTodo = async (_id: string) => {
  const response = await api.get(`/todos/${_id}`);
  return response.data;
};

export const createTodo = async ({
  title,
  description,
  icon,
  date,
  time,
}: {
  title: string;
  description: string;
  icon: string;
  date: string;
  time: string;
}) => {
  const response = await api.post('/todos/', { title, description, icon, date, time });
  return response.data;
};

export const updateTodo = async ({
  _id,
  title,
  description,
  icon,
  date,
  time,
}: {
  _id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  time: string;
}) => {
  const response = await api.put(`/todos/${_id}`, { title, description, icon, date, time });
  return response.data;
};

export const deleteTodo = async (_id: string) => {
  const response = await api.delete(`/todos/${_id}`);
  return response.data;
};