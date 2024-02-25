import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { UserFooterComponent } from 'src/app/components/user-footer/user-footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuButtonComponent, FaIconComponent, NgFor, UserFooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  selectedMenu = 'Home';
  playlists: IPlaylist[] = [];

  constructor(private spotifyService: SpotifyService, private router: Router) {
    this.getPlaylists();
  }

  buttonClick(menuTitle: string) {
    this.selectedMenu = menuTitle;
    this.router.navigateByUrl('player/home');
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getUserPlaylists();
  }
}
