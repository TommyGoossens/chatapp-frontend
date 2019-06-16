import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../../../core/authentication/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loginSubject;
  }
}
