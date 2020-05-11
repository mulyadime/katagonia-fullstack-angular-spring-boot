import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../__services/token.service';

const KEY_HEADER_TOKEN = 'Authorization'; // From Spring Boot Backend

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private svcToken: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.svcToken.getToken();
    if (token != null) {
      authRequest = request.clone({
        headers: request.headers.set(KEY_HEADER_TOKEN, 'Bearer ' + token)
      });
    }

    return next.handle(request);
  }
}

export const AuthInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
