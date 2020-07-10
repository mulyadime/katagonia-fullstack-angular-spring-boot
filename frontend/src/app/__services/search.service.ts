import { Injectable } from '@angular/core';
import { AppUtil } from '../__helpers/AppUtil';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Search } from '../_models/search';

const BASE_API = AppUtil.API_ENDPOINT + 'search/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getSearch(item: string) {
    return this.http.get<any>(BASE_API + item, httpOptions);
  }
}
