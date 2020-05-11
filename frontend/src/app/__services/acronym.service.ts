import { Injectable } from '@angular/core';
import { AppUtil } from '../__helpers/AppUtil';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Acronym } from '../_models/acronym';

const BASE_API = AppUtil.API_ENDPOINT + 'acronym/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AcronymService {

  acronym: Acronym;

  constructor(
    private http: HttpClient
  ) { }

  findAll() {
    return this.http.get<any>(BASE_API, httpOptions);
  }

  findOne(item: any) {
    return this.http.get<any>(BASE_API + item, httpOptions);
  }

  create(item: any) {
    this.acronym = new Acronym(
      item.name,
      item.category,
      item.indonesia,
      item.english
    );
    return this.http.post<Acronym>(BASE_API, this.acronym, httpOptions);
  }

  update(id:number, item: any) {
    this.acronym = new Acronym(
      item.name,
      item.category,
      item.indonesia,
      item.english
    );
    return this.http.put<Acronym>(BASE_API + id, this.acronym, httpOptions);
  }

  remove(item: any) {
    return this.http.delete(BASE_API + item, httpOptions);
  }

}
