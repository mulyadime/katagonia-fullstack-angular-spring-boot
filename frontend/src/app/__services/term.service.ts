import { Injectable } from '@angular/core';
import { AppUtil } from '../__helpers/AppUtil';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Term } from '../_models/term';

const API_AUTH = AppUtil.API_ENDPOINT + 'term/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TermService {

  term: Term;

  constructor(
    private http: HttpClient
  ) { }

  findAll() {
    return this.http.get<any>(API_AUTH, httpOptions);
  }

  findOne(item: any) {
    return this.http.get<any>(API_AUTH + item, httpOptions);
  }

  create(items: any) {
    this.term = new Term(
      items.name,
      items.translation,
      items.category,
      items.language,
    );
    return this.http.post<Term>(API_AUTH, this.term, httpOptions);
  }

  update(id:number, items: any) {
    this.term = new Term(
      items.name,
      items.translation,
      items.category,
      items.language,
    );
    return this.http.put<Term>(API_AUTH + id, this.term, httpOptions);
  }

  remove(item: any) {
    return this.http.delete(API_AUTH + item, httpOptions);
  }

}
