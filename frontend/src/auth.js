// src/auth.js
export const auth = {
  isAuthenticated: false,
  user: null,
  
  login(userData) {
    this.isAuthenticated = true;
    this.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  },
  
  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem('user');
  },
  
  getCurrentUser() {
    return this.user || JSON.parse(localStorage.getItem('user'));
  }
};