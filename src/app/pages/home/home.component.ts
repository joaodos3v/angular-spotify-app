import { Subscription } from 'rxjs';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import { Component, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnDestroy {
  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  subs: Subscription[] = [];

  playIcon = faPlay;

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    // Note: garante que não teremos memory leak, pois nos desinscrevemos de todos os subscriptions
    this.subs.forEach((sub) => sub.unsubscribe());
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
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }
}
