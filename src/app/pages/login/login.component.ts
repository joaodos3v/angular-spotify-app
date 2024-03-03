import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.checkTokenUrlCallback();
  }

  openLoginPage() {
    window.location.href = this.sessionService.getLoginUrl();
  }

  checkTokenUrlCallback() {
    const token = this.sessionService.getTokenFromUrlCallback();
    if (!!token) {
      this.sessionService.setAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }
}
