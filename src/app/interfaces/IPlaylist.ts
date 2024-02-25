import { IMusic } from './IMusic';

export interface IPlaylist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}
