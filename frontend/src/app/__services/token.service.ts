import { Injectable } from '@angular/core';

const KEY_TOKEN = 'auth-token';
const KEY_USER  = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  save(token: string, user: string) {
    window.sessionStorage.removeItem(KEY_TOKEN);
    window.sessionStorage.setItem(KEY_TOKEN, token);

    window.sessionStorage.removeItem(KEY_USER);
    window.sessionStorage.setItem(KEY_USER, user);
  }

  logout() {
    window.sessionStorage.clear();
  }

  getToken(): string {
    return window.sessionStorage.getItem(KEY_TOKEN);
  }

  getUser(): string {
    return window.sessionStorage.getItem(KEY_USER);
  }
}
