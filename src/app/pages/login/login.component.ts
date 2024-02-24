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

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }
}
