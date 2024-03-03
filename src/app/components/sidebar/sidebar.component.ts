import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { OldSpotifyService } from 'src/app/services/old-spotify.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { UserFooterComponent } from 'src/app/components/user-footer/user-footer.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuButtonComponent, FaIconComponent, NgFor, UserFooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  selectedMenu = 'Home';
  playlists: Playlist[] = [];

  constructor(private oldSpotifyService: OldSpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  buttonClick(menu: string) {
    this.selectedMenu = menu;
    this.router.navigateByUrl('player/home');
  }

  goToPlaylist(playlistId: string) {
    this.selectedMenu = playlistId;
    this.router.navigateByUrl(`player/playlist/custom/${playlistId}`);
  }

  async getPlaylists() {
    this.playlists = await this.oldSpotifyService.getUserPlaylists();
  }
}
