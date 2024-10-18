import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Authentication API
export const login = (credentials) => api.post("/users/login", credentials);
export const signup = (userData) => api.post("/users/signup", userData);

// Task Management API
export const createTask = (taskData) => api.post("/tasks", taskData);
export const getTasks = () => api.get("/tasks");
export const getOneTasks = (id, taskData) => api.get(`/tasks/${id}`, taskData);
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
