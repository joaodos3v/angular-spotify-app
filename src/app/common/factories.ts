import { IArtist } from 'src/app/interfaces/IArtist';

export function newArtist(): IArtist {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}
