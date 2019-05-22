import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

const baseURL = 'http://localhost:22501/';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(endpoint: string): Observable<any> {
    console.log('[GETTING] : ', endpoint);
    return this.httpClient.get(baseURL + endpoint);
  }

  public post<T>(endpoint: string, payload: T): Observable<any> {
    return this.httpClient.post<T>(baseURL + endpoint, payload)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError('[POST]');
          return of(err);
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
