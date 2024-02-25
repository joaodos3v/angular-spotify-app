import { Component } from '@angular/core';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopArtistComponent, RightPanelComponent, FaIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  playIcon = faPlay;

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) {
    this.getMusics();
    this.getCurrentMusic();
  }

  async getMusics() {
    this.musics = await this.spotifyService.getMusics();
  }

  getArtists(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
  }

  getCurrentMusic() {
    this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });
  }
}
