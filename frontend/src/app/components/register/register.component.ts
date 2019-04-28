import {Component, OnInit} from '@angular/core';
import {AuthenticationParticipant} from '../../models/AuthenticationParticipant';
import {RestService} from '../../services/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {RegisterParticipant} from '../../models/RegisterParticipant';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private error: string;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/chat']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  submitRegister() {
    const registerParticipant = new RegisterParticipant();
    registerParticipant.email = this.form.email.value;
    registerParticipant.firstname = this.form.firstname.value;
    registerParticipant.lastname = this.form.lastname.value;
    registerParticipant.password = this.form.password.value;

    this.authService.signUp(registerParticipant)
      .subscribe(
        res => {
          if (res) {
            this.router.navigate(['/login']);
          }
        },
        error => {
          this.alertService.error(error);
        }
      );
  }
}

