import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttprequestService {
  private apiUrl = 'https://localhost:7227/api'; // URL base

  constructor(private http: HttpClient) { }

  async get(endpoint: string): Promise<any> {
    try {
      return await this.http.get(`${this.apiUrl}/${endpoint}`).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(endpoint: string, data: any): Promise<any> {
    try {
      return await this.http.post(`${this.apiUrl}/${endpoint}`, data).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put(endpoint: string, data: any): Promise<any> {
    try {
      return await this.http.put(`${this.apiUrl}/${endpoint}`, data).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(endpoint: string): Promise<any> {
    try {
      return await this.http.delete(`${this.apiUrl}/${endpoint}`).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
