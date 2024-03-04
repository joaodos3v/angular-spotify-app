import { Music } from 'src/app/domain/models/music.model';
import { Artist } from 'src/app/domain/models/artist.model';
import { Playlist } from 'src/app/domain/models/playlist.model';

export function newArtist(): Artist {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}

export function newMusic(): Music {
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

export function newPlaylist(): Playlist {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}
