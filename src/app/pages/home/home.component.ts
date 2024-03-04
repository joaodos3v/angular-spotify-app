import { Subscription } from 'rxjs';
import { Music } from 'src/app/models/music.model';
import { newMusic } from 'src/app/common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MusicsService } from 'src/app/application/services/musics.service';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopArtistComponent, RightPanelComponent, FaIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  musicsService = inject(MusicsService);
  playerService = inject(PLAYER_PROVIDER);
  currentMusicService = inject(CurrentMusicService);

  musics: Music[] = [];
  currentMusic: Music = newMusic();

  subs: Subscription[] = [];

  playIcon = faPlay;

  constructor() {}

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    // Note: garante que não teremos memory leak, pois nos desinscrevemos de todos os subscriptions
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  async getMusics() {
    this.musics = await this.musicsService.getMusics();
  }

  getArtists(music: Music) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  async playMusic(music: Music) {
    await this.playerService.play(music.id);
    this.currentMusicService.setCurrentMusic(music);
  }

  getCurrentMusic() {
    const sub = this.currentMusicService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }
}
