import { Music } from './music.model';

export class Playlist {
  constructor(readonly id: string, readonly name: string, readonly imageUrl: string, public musics: Music[] = []) {}
}
