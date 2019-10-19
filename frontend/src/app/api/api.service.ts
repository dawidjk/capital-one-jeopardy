import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://jservice.io';

  constructor(private httpClient: HttpClient) { }

  public getCategories(count: number, offset: number) {
    return this.httpClient.get<Category[]>(`${this.apiURL}/api/categories?count=${count}&offset=${offset}`);
  }
}
