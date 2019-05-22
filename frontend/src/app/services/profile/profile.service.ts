import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private restService: RestService, private http: HttpClient) {
  }

  uploadProfilePicture(image: File): Observable<Response> {
    const formData: FormData = new FormData();
    formData.append('file', image);
    return this.restService.post<FormData>('user/profile/picture', formData);
  }

  getProfilePicture(): Observable<any> {
    return this.restService.get('user/profile/picture');
  }

  retrieveProfileDetails() {
    return this.restService.get('user/profile');
  }
}
