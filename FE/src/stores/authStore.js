import {defineStore} from "pinia";
import {authService} from "../services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await authService.login(credentials);
        console.log(response);
        this.user = response.user;
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async register(userData) {
      try {
        const response = await authService.register(userData);
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      authService.clearAuthToken();
      this.isAuthenticated = false;
    },

    async checkAuth() {
      if (authService.isAuthenticated()) {
        this.isAuthenticated = true;
      }
    },
  },
});
