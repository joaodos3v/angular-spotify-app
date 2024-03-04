import { InjectionToken } from '@angular/core';
import { Music } from 'src/app/domain/models/music.model';

export interface MusicsRepository {
  getMusics(offset: number, limit: number): Promise<Music[]>;
  getCurrentMusic(): Promise<Music>;
}

export const MUSICS_REPOSITORY_PROVIDER = new InjectionToken<MusicsRepository>('MUSICS_REPOSITORY_PROVIDER');
