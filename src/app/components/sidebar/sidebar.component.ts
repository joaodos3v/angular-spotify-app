import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { Playlist } from 'src/app/domain/models/playlist.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { PlaylistsService } from 'src/app/application/services/playlists.service';
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
  // TODO: inject this via module and check if this is a good practice
  playlistsService = inject(PlaylistsService);

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  selectedMenu = 'Home';
  playlists: Playlist[] = [];

  constructor(private router: Router) {}

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
    this.playlists = await this.playlistsService.getPlaylists();
  }
}
