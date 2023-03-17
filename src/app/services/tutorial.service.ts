import { Injectable } from '@angular/core';
import axios from 'axios';

import { Tutorial } from '../models/tutorial.model';


@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  //api
  private baseUrl = 'https://node-tutorials-api.herokuapp.com';

  constructor() {}

  async getAll(): Promise<Tutorial[]> {
    const response = await axios.get<Tutorial[]>(this.baseUrl);
    return response.data;
  }

  async get(id: any): Promise<Tutorial> {
    const response = await axios.get<Tutorial>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: any): Promise<any> {
    const response = await axios.post(this.baseUrl, data);
    return response.data;
  }

  async update(id: any, data: any): Promise<any> {
    const response = await axios.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: any): Promise<any> {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async deleteAll(): Promise<any> {
    const response = await axios.delete(this.baseUrl);
    return response.data;
  }

  async findByTitle(title: any): Promise<Tutorial[]> {
    const response = await axios.get<Tutorial[]>(`${this.baseUrl}?title=${title}`);
    return response.data;
  }
}
