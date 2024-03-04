import { BehaviorSubject } from 'rxjs';
import { MusicsService } from './musics.service';
import { Injectable, inject } from '@angular/core';
import { newMusic } from 'src/app/common/factories';
import { Music } from 'src/app/domain/models/music.model';

const THREE_SECONDS_IN_MS = 5000;

@Injectable()
export class CurrentMusicService {
  musicsService = inject(MusicsService);

  // Note: segundo o instrutor, BehaviorSubject é o mesmo que Subject, com a diferença que conseguimos definir o valor de início
  currentMusic = new BehaviorSubject<Music>(newMusic());

  timerId: any = null;

  constructor() {
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
