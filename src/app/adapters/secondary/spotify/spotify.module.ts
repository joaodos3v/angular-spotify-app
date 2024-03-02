import { NgModule } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { SPOTIFY_API_PROVIDER } from './providers/spotify-api.provider';

@NgModule({
  providers: [
    {
      provide: SPOTIFY_API_PROVIDER,
      useValue: new Spotify(),
    },
  ],
})
export class SpotifyModule {}
