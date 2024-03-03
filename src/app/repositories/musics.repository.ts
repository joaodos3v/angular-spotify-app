import { Music } from 'src/app/models/music.model';

export interface MusicsRepository {
  getMusics(offset: number, limit: number): Promise<Music[]>;
  getCurrentMusic(): Promise<Music>;
}
