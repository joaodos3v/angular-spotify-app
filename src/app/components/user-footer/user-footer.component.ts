import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-footer',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss',
})
export class UserFooterComponent {
  user: IUser = null;
  exitIcon = faSignOutAlt;

  constructor(private spotifyService: SpotifyService) {
    this.user = this.spotifyService.user;
  }

  logout() {
    this.spotifyService.logout();
  }
}
