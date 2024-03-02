import { Music } from './music.model';

export class Playlist {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly imageUrl: string,
    public musics?: Music[]
  ) {}
}
