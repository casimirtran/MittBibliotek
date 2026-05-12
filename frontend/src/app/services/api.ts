import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:5226/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` }) };
  }

  getBooks() { return this.http.get(`${this.apiUrl}/books`, this.getHeaders()); }
  addBook(book: any) { return this.http.post(`${this.apiUrl}/books`, book, this.getHeaders()); }
  updateBook(id: number, book: any) { return this.http.put(`${this.apiUrl}/books/${id}`, book, this.getHeaders()); }
  deleteBook(id: number) { return this.http.delete(`${this.apiUrl}/books/${id}`, this.getHeaders()); }

  getQuotes() { return this.http.get(`${this.apiUrl}/quotes`, this.getHeaders()); }
  addQuote(quote: any) { return this.http.post(`${this.apiUrl}/quotes`, quote, this.getHeaders()); }
  updateQuote(id: number, quote: any) { return this.http.put(`${this.apiUrl}/quotes/${id}`, quote, this.getHeaders()); }
  deleteQuote(id: number) { return this.http.delete(`${this.apiUrl}/quotes/${id}`, this.getHeaders()); }
}