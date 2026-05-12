import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5226/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) { return this.http.post(`${this.apiUrl}/register`, user); }
  login(user: any) { return this.http.post(`${this.apiUrl}/login`, user); }
  
  saveToken(token: string) { localStorage.setItem('token', token); }
  getToken() { return localStorage.getItem('token'); }
  isLoggedIn() { return !!this.getToken(); }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}