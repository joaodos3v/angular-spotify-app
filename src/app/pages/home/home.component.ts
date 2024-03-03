import { Subscription } from 'rxjs';
import { Music } from 'src/app/models/music.model';
import { newMusic } from 'src/app/common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { MusicsService } from 'src/app/services/musics.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { OldPlayerService } from 'src/app/services/old-player.service';
import { OldSpotifyService } from 'src/app/services/old-spotify.service';
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
  // TODO: inject this via module and check if this is a good practice
  musicsService = inject(MusicsService);

  musics: Music[] = [];
  currentMusic: Music = newMusic();

  subs: Subscription[] = [];

  playIcon = faPlay;

  constructor(private oldSpotifyService: OldSpotifyService, private oldPlayerService: OldPlayerService) {}

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
    await this.oldSpotifyService.playMusic(music.id);
    this.oldPlayerService.setCurrentMusic(music);
  }

  getCurrentMusic() {
    const sub = this.oldPlayerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }
}
