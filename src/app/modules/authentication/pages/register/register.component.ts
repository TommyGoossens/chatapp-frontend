import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/authentication/auth.service';
import {Router} from '@angular/router';
import {RegisterParticipant} from '../../models/RegisterParticipant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerParticipant = new RegisterParticipant();
  private error: string;

  constructor(private authService: AuthService,
              private router: Router) {
    if (AuthService.isAuthenticated()) {
      this.router.navigate(['/chat']);
    }
  }

  ngOnInit() {
  }

  submitRegister() {
    if (this.allFieldsFilled()) {
      this.authService.signUp(this.registerParticipant)
        .subscribe(
          res => {
            if (res) {
              this.router.navigate(['auth/login']);
            }
          }
        );
    }
  }

  allFieldsFilled(): boolean {
    return this.registerParticipant.email !== ''
      && this.registerParticipant.password !== ''
      && this.registerParticipant.firstname !== ''
      && this.registerParticipant.lastname !== ''
      && this.registerParticipant.password.length > 5;
  }
}

