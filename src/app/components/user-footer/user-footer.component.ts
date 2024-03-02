import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { OldSpotifyService } from 'src/app/services/old-spotify.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-footer',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss',
})
export class UserFooterComponent {
  user: User = null;
  exitIcon = faSignOutAlt;

  constructor(private oldSpotifyService: OldSpotifyService) {
    this.user = this.oldSpotifyService.user;
  }

  logout() {
    this.oldSpotifyService.logout();
  }
}
