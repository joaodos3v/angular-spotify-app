import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Music } from '../models/music.model';
import { MusicsService } from './musics.service';
import { newMusic } from 'src/app/common/factories';

const THREE_SECONDS_IN_MS = 5000;

@Injectable({
  providedIn: 'root',
})
export class OldPlayerService {
  // Note: segundo o instrutor, BehaviorSubject é o mesmo que Subject, com a diferença que conseguimos definir o valor de início
  currentMusic = new BehaviorSubject<Music>(newMusic());

  timerId: any = null;

  constructor(private musicsService: MusicsService) {
    // TODO: inject via InjectionToken in a generic way

    // TODO: if I use ngOnInit, this method is not called. Why?
    this.getCurrentMusic();
  }

  // Note: criamos esse interval para que fosse possível "reagir" às mudanças feitas no próprio Spotify (como estamos usando a API Rest, não temos como "observar" as mudanças vindas de lá)
  async getCurrentMusic() {
    clearTimeout(this.timerId);

    // Get current music from Spotify
    const currentMusic = await this.musicsService.getCurrentMusic();
    this.setCurrentMusic(currentMusic);

    // Create "recursive loop"
    this.timerId = setInterval(async () => {
      await this.getCurrentMusic();
    }, THREE_SECONDS_IN_MS);
  }

  setCurrentMusic(music: Music) {
    this.currentMusic.next(music);
  }
}
