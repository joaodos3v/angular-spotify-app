import { IMusic } from './IMusic';

export interface IArtist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}
