import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationParticipant} from '../../models/AuthenticationParticipant';
import {AlertService} from '../../services/alert/alert.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private returnUrl: string;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
    if (this.authService.loginSubject) {
      this.router.navigate(['/chat']);
    }
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();

  }

  get form() {
    return this.loginForm.controls;
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const authy = new AuthenticationParticipant();
    authy.email = this.form.email.value;
    authy.password = this.form.password.value;

    this.authService.signIn(authy)
      .subscribe(
        data => {
          if (!data.error) {
            this.router.navigate(['/chat']);
          } else {
            this.alertService.error(data.error.message);
          }
        }
      )
    ;
  }
}



