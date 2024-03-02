import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OldSpotifyService } from 'src/app/services/old-spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private oldSpotifyService: OldSpotifyService, private router: Router) {
    this.checkTokenUrlCallback();
  }

  openLoginPage() {
    window.location.href = this.oldSpotifyService.getLoginUrl();
  }

  checkTokenUrlCallback() {
    const token = this.oldSpotifyService.getTokenFromUrlCallback();
    if (!!token) {
      this.oldSpotifyService.setAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }
}
