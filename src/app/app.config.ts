import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppRoutes } from './app.routes';

// TODO: deixar aqui só se for usado na aplicação toda (ou em vários componentes)
import { MusicsService } from 'src/app/application/services/musics.service';
import { ArtistsService } from 'src/app/application/services/artists.service';
import { PlaylistsService } from 'src/app/application/services/playlists.service';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';

import { provideSpotify } from './adapters/secondary/spotify/provide-spotify';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(AppRoutes),
    MusicsService,
    ArtistsService,
    PlaylistsService,
    CurrentMusicService,
    ...provideSpotify(),
  ],
};
