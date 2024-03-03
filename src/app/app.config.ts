import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppRoutes } from './app.routes';

import { MusicsService } from './services/musics.service';
import { SpotifyMusicsRepository } from './adapters/secondary/spotify/repositories/spotify-musics.repository';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(AppRoutes), MusicsService, SpotifyMusicsRepository],
};
