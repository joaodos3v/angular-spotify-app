import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  // Note: segundo o instrutor, BehaviorSubject é o mesmo que Subject, com a diferença que conseguimos definir o valor de início
  currentMusic = new BehaviorSubject<IMusic>(newMusic());

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusicFromSpotify();
  }

  async getCurrentMusicFromSpotify() {
    const currentMusic = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(currentMusic);
  }

  setCurrentMusic(music: IMusic) {
    this.currentMusic.next(music);
  }
}
