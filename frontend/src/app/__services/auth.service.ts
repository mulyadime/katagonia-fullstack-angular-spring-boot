import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUtil } from '../__helpers/AppUtil';

const BASE_API = AppUtil.API_ENDPOINT + 'auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(items: any) {
    return this.http.post<any>(BASE_API, {
      username: items.username, password: items.password
    }, httpOptions);
  }

  register(items: any) {
    return this.http.post<any>(BASE_API + 'register', {
      username: items.username, password: items.password
    }, httpOptions);
  }

}
