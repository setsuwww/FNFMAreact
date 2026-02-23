import axios from "axios";
import type { AxiosInstance } from "axios";

export interface LoginResponse {
  token: string;
  email: string;
  role: string | "User" | "Admin";
}

export class UserService {
  private api: AxiosInstance;

  constructor(baseURL: string = "http://localhost:5258/api/auth") {
    this.api = axios.create({ baseURL });
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await this.api.post<LoginResponse>("/login", { email, password });
    return res.data;
  }

  async register(data: { username: string; email: string; password: string; role?: string }) {
    const res = await this.api.post(`/register`, data);
    return res.data;
  }

  // contoh method tambahan
  async getProfile(token: string) {
    const res = await this.api.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
}
