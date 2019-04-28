import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

const baseURL = 'http://localhost:22501/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authentication: localStorage.getItem('access_token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(endpoint: string): Observable<any> {
    return this.httpClient.get(baseURL + endpoint);
  }

  public post<T>(endpoint: string, payload: T): Observable<any> {
    return this.httpClient.post<T>(baseURL + endpoint, payload, httpOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handleError('[POST]');
          return of(err);
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
