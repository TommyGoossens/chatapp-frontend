import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthService} from '../authentication/auth.service';
import {LoggingService, LogLevel} from '../services/logging.service';
import {AlertService} from '../../shared/components/alert-module/service/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private loggingService: LoggingService, private alertService: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        location.reload(true);
      }

      this.loggingService.log(LogLevel.ERROR, 'Error interceptor', `[ERROR FOUND] :  ${err}`);
      this.alertService.error(`Error content: ${err.error.message}`);
      const error = err.error.content || err.statusText;

      return throwError(err);
    }));
  }
}
