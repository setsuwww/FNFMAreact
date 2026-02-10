import axios from "axios";

const API = "http://localhost:5000/api/auth";

export async function login(username: string, password: string) {
  return axios.post(`${API}/login`, { username, password });
}

export async function register(username: string, password: string) {
  return axios.post(`${API}/register`, { username, password });
}
