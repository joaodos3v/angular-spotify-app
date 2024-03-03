import { Injectable } from '@angular/core';
import { Music } from '../models/music.model';
import { MusicsRepository } from 'src/app/repositories/musics.repository';
import { SpotifyMusicsRepository } from 'src/app/adapters/secondary/spotify/repositories/spotify-musics.repository';

@Injectable()
export class MusicsService implements MusicsRepository {
  constructor(private musicsRepository: SpotifyMusicsRepository) {
    // TODO: inject via InjectionToken in a generic way
  }

  async getMusics(offset = 0, limit = 50): Promise<Music[]> {
    return await this.musicsRepository.getMusics(offset, limit);
  }

  getCurrentMusic(): Promise<Music> {
    throw new Error('Method not implemented.');
  }
}
