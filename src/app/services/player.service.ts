import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';

const THREE_SECONDS_IN_MS = 5000;

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // Note: segundo o instrutor, BehaviorSubject é o mesmo que Subject, com a diferença que conseguimos definir o valor de início
  currentMusic = new BehaviorSubject<IMusic>(newMusic());

  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusicFromSpotify();
  }

  // Note: criamos esse interval para que fosse possível "reagir" às mudanças feitas no próprio Spotify (como estamos usando a API Rest, não temos como "observar" as mudanças vindas de lá)
  async getCurrentMusicFromSpotify() {
    clearTimeout(this.timerId);

    // Get current music from Spotify
    const currentMusic = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(currentMusic);

    // Create "recursive loop"
    this.timerId = setInterval(async () => {
      await this.getCurrentMusicFromSpotify();
    }, THREE_SECONDS_IN_MS);
  }

  setCurrentMusic(music: IMusic) {
    this.currentMusic.next(music);
  }
}
