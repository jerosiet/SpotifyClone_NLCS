import axios from "axios";

const authUrl = "http://localhost:3000/auth";

const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const authService = {
  async uploadAvatar(file) {
    try {
      const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
      const formData = new FormData();
      formData.append("tags", "browser_upload");
      formData.append("upload_preset", "imageFolder");
      formData.append("folder", "avatar");
      formData.append("file", file);

      const response = await axios.post(url, formData, {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error("Upload avatar failed");
      }
    } catch (error) {
      console.error("Upload image error:", error);
      throw error;
    }
  },
  async register(userData) {
    try {
      const response = await axios.post(`${authUrl}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response.data);
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post(`${authUrl}/login`, credentials);
      const {token} = response.data;
      if (token) {
        this.setAuthToken(token);
        localStorage.setItem("jwtToken", token);
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response.data);
      throw error;
    }
  },

  setAuthToken(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  clearAuthToken() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwtToken");
  },

  getToken() {
    return localStorage.getItem("jwtToken");
  },

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },
};
