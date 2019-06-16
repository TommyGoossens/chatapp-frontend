import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../authentication/auth.service';
import {LoggingService, LogLevel} from '../services/logging.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private logService: LoggingService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!AuthService.isAuthenticated()) {
      this.logService.log(LogLevel.INFO, 'AuthGuard', 'User is not authenticated');
      this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
    return true;
  }
}
