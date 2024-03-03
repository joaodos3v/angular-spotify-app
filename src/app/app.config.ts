import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppRoutes } from './app.routes';

import { MusicsService } from './services/musics.service';
import { SpotifyMusicsRepository } from './adapters/secondary/spotify/repositories/spotify-musics.repository';
import { PlaylistsService } from './services/playlists.service';
import { SpotifyPlaylistsRepository } from './adapters/secondary/spotify/repositories/spotify-playlists.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(AppRoutes),
    MusicsService,
    SpotifyMusicsRepository,
    PlaylistsService,
    SpotifyPlaylistsRepository,
  ],
};
