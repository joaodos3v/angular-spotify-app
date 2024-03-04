import Spotify from 'spotify-web-api-js';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { SPOTIFY_API_PROVIDER } from './providers/spotify-api.provider';
import { SpotifyPlayerService } from './services/spotify-player.service';
import { SpotifyMusicsRepository } from './repositories/spotify-musics.repository';
import { MUSICS_REPOSITORY_PROVIDER } from 'src/app/repositories/musics.repository';
import { SpotifyArtistsRepository } from './repositories/spotify-artists.repository';
import { ARTISTS_REPOSITORY_PROVIDER } from 'src/app/repositories/artists.repository';
import { SpotifyPlaylistsRepository } from './repositories/spotify-playlists.repository';
import { PLAYLISTS_REPOSITORY_PROVIDER } from 'src/app/repositories/playlists.repository';

export const provideSpotifyPlayerService = () => [
  {
    provide: PLAYER_PROVIDER,
    useClass: SpotifyPlayerService,
  },
];

export const provideSpotifyAPI = () => [
  {
    provide: SPOTIFY_API_PROVIDER,
    useValue: new Spotify(),
  },
];

export const provideSpotifyArtistsRepository = () => [
  {
    provide: ARTISTS_REPOSITORY_PROVIDER,
    useClass: SpotifyArtistsRepository,
  },
];

export const provideSpotifyMusicsRepository = () => [
  {
    provide: MUSICS_REPOSITORY_PROVIDER,
    useClass: SpotifyMusicsRepository,
  },
];

export const provideSpotifyPlaylistsRepository = () => [
  {
    provide: PLAYLISTS_REPOSITORY_PROVIDER,
    useClass: SpotifyPlaylistsRepository,
  },
];

export const provideSpotify = () => {
  return [
    ...provideSpotifyPlayerService(),
    ...provideSpotifyAPI(),
    ...provideSpotifyArtistsRepository(),
    ...provideSpotifyMusicsRepository(),
    ...provideSpotifyPlaylistsRepository(),
  ];
};
