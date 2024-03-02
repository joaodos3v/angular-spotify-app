import { Subscription } from 'rxjs';
import { Music } from 'src/app/models/music.model';
import { newMusic } from 'src/app/common/factories';
import { Component, OnDestroy } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { OldPlayerService } from 'src/app/services/old-player.service';
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
  musics: Music[] = [];
  currentMusic: Music = newMusic();

  subs: Subscription[] = [];

  playIcon = faPlay;

  constructor(private spotifyService: SpotifyService, private playerService: OldPlayerService) {
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

  getArtists(music: Music) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async playMusic(music: Music) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }

  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }
}
