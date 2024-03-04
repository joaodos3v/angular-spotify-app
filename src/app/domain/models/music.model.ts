import { Album } from './album.model';
import { Artist } from './artist.model';

export class Music {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artists: Artist[],
    public readonly album: Album,
    public readonly time: string
  ) {}
}
