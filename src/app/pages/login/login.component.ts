import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private spotifyService: SpotifyService) {}

  // Note: executa toda vez que o componente é montado [READ]
  ngOnInit(): void {
    this.checkTokenUrlCallback();
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

  checkTokenUrlCallback() {
    const token = this.spotifyService.getTokenFromUrlCallback();
    if (!!token) {
      this.spotifyService.setAccessToken(token);
    }
  }
}
