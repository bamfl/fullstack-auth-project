import httpClient from "../httpClient.js";
import axios from "axios";

class AuthService {
  async login(data) {
    try {
      return await httpClient.post("/login", data);
    } catch (e) {
      console.error(e);
    }
  }

  async registration(data) {
    try {
      return await httpClient.post("/registration", data);
    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    try {
      return await httpClient.post("/logout");
    } catch (e) {
      console.error(e);
    }
  }

  async checkAuth() {
    try {
      return await axios.get(`http://localhost:5000/api/refresh`, {
        withCredentials: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getUsers() {
    try {
      return await httpClient.get("/users");
    } catch (e) {
      console.error(e);
    }
  }
}

export default new AuthService();
