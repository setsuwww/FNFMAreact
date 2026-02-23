import axios from "axios";

const API = "http://localhost:5258/api/auth";

export async function login(email: string, password: string) {
  return axios.post(`${API}/login`, { email, password });
}

export async function register(email: string, password: string) {
  return axios.post(`${API}/register`, { email, password });
}
