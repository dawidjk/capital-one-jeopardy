import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Clue } from '../models/clue';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'https://cors-anywhere.herokuapp.com/http://jservice.io';

  constructor(private httpClient: HttpClient) {}

  public getCategories(count: number, offset: number) {
    return this.httpClient.get<Category[]>(
      `${this.apiURL}/api/categories?count=${count}&offset=${offset}`
    );
  }

  public getRandom(count: number) {
    return this.httpClient.get<Clue[]>(
      `${this.apiURL}/api/random?count=${count}`
    );
  }

  public getClue(options: any) {
    let url = `${this.apiURL}/api/clues?`;
    let total = 0;
    // tslint:disable-next-line: forin
    for (const key in options) {
      if (options[key] == null) {
        continue;
      }

      if (total > 0) {
        url += '&';
      }

      url += (key + '=' + options[key]);

      total += 1;
    }

    return this.httpClient.get<Clue[]>(url);
  }
}
