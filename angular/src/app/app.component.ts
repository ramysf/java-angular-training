import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Admin Panel';
  isDisplayed = false;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isAuthenticated()) {
      router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url === '/login' || this.router.url === '/signup') {
            this.isDisplayed = true;
            console.log(this.router.url);
          } else {
            this.isDisplayed = false;
          }
        }
      }
    );
  }
}
