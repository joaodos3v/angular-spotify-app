import { Music } from './music.model';

export class Artist {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly imageUrl?: string,
    public readonly musics?: Music[]
  ) {}
}
