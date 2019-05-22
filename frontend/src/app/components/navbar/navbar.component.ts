import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router, private authService: AuthService) {
    this.navLinks = [
      {
        label: 'Chat',
        link: './chat',
        index: 0
      }, {
        label: 'Profile',
        link: './profile',
        index: 1
      }, {
        label: 'Settings',
        link: './settings',
        index: 2
      },
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('User logged out');
  }
}
