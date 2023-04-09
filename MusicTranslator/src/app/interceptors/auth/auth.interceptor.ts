import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("intercepted")
    console.log(request.body)
    if(this.authService.hasSessionId()) {
      
    console.log("hasSessionId")
      request = request.clone({
        setHeaders: {
          "Authorization": "Bearer " + this.authService.getSessionId()
        }
      })
    }
    console.log(request.headers)
    return next.handle(request);
  }
}
