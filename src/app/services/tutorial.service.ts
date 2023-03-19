import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

import { environment } from '../../environments/environment';
import { Tutorial } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  //api
  private baseUrl = environment.apiUrl;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${this.baseUrl}/tutorials`,
      timeout: 1000,
    });
  }

  async getAll(): Promise<Tutorial[]> {
    const response = await this.axiosInstance.get<Tutorial[]>('');
    return response.data;
  }

  async get(id: any): Promise<Tutorial> {
    const response = await this.axiosInstance.get<Tutorial>(`/${id}`);
    return response.data;
  }

  async create(data: any): Promise<any> {
    const response = await this.axiosInstance.post('', data);
    return response.data;
  }

  async update(id: any, data: any): Promise<any> {
    const response = await this.axiosInstance.put(`/${id}`, data);
    return response.data;
  }

  async delete(id: any): Promise<any> {
    const response = await this.axiosInstance.delete(`/${id}`);
    return response.data;
  }

  async deleteAll(): Promise<any> {
    const response = await this.axiosInstance.delete('');
    return response.data;
  }

  async findByTitle(title: any): Promise<Tutorial[]> {
    const response = await this.axiosInstance.get<Tutorial[]>(
      `?title=${title}`
    );
    return response.data;
  }
}
