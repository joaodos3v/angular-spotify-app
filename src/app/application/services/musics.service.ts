import { Injectable, inject } from '@angular/core';
import { Music } from 'src/app/models/music.model';
import { MUSICS_REPOSITORY_PROVIDER, MusicsRepository } from 'src/app/repositories/musics.repository';

@Injectable()
export class MusicsService {
  musicsRepository = inject(MUSICS_REPOSITORY_PROVIDER);

  constructor() {}

  async getMusics(offset = 0, limit = 50): Promise<Music[]> {
    return await this.musicsRepository.getMusics(offset, limit);
  }

  async getCurrentMusic(): Promise<Music> {
    return await this.musicsRepository.getCurrentMusic();
  }
}
