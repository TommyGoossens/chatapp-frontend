import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoggingService, LogLevel} from './logging.service';

const baseURL = 'http://localhost:22501/';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient, private logService: LoggingService) {
  }

  public get<T>(endpoint: string): Observable<any> {
    this.logService.log(LogLevel.INFO, 'RestService', `[GETTING] : ${endpoint}`);
    return this.httpClient.get(baseURL + endpoint)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError('[GET]');
          return of(err);
        })
      );
  }

  public post<T>(endpoint: string, payload: T): Observable<any> {
    this.logService.log(LogLevel.INFO, 'RestService', `[POSTING] : ${endpoint}; payload: ${payload}`);
    return this.httpClient.post<T>(baseURL + endpoint, payload)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError('[POST]');
          return of(err);
        })
      );
  }

  public put<T>(endpoint: string, payload: T): Observable<any> {
    this.logService.log(LogLevel.INFO, 'RestService', `[PUTTING] : ${endpoint}; payload: ${payload}`);
    return this.httpClient.put<T>(baseURL + endpoint, payload)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError('[PUT]');
          return of(err);
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logService.log(LogLevel.ERROR, 'Rest service', `${operation} failed: ${error.content}`);
      return of(result as T);
    };
  }

  searchEmail<T>(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<T>(`http://localhost:22501/user/profile/checkfriend/${term}`).pipe(
      tap(_ => console.log(`found heroes matching "${term}"`))
    );
  }
}
