import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/authentication/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationParticipant} from '../../models/AuthenticationParticipant';
import {AlertService} from '../../../../shared/components/alert-module/service/alert.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authy = new AuthenticationParticipant();

  constructor(private authService: AuthService,
              private router: Router) {
    if (AuthService.isAuthenticated()) {
      this.router.navigate(['chat']);
    }
  }


  ngOnInit() {
    this.authService.logout();

  }

  submitLogin() {
    if (!this.allFieldsFilled()) {
      return;
    }
    this.authService.signIn(this.authy)
      .subscribe(
        data => {
          if (!data.error) {
            this.router.navigate(['chat']);
          }
        }
      )
    ;
  }

  allFieldsFilled(): boolean {
    return this.authy.email !== ''
      && this.authy.password !== '';
  }
}



