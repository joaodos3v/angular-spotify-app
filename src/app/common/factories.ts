import { IMusic } from 'src/app/interfaces/IMusic';
import { IArtist } from 'src/app/interfaces/IArtist';

export function newArtist(): IArtist {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}

export function newMusic(): IMusic {
  return {
    id: '',
    title: '',
    artists: [],
    album: {
      id: ' ',
      imageUrl: '',
      name: '',
    },
    time: '',
  };
}
