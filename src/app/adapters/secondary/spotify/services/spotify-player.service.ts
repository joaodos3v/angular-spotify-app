import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { Player } from 'src/app/providers/player.provider';

@Injectable()
export class SpotifyPlayerService implements Player {
  // TODO: por quê spotifyAPI não funciona aqui?
  /**
   * app.routes.ts:12 ERROR NullInjectorError: R3InjectorError(Standalone[_HomeComponent])[_SpotifyPlayerService -> _SpotifyPlayerService -> _SpotifyPlayerService -> _SpotifyPlayerService]:
  NullInjectorError: No provider for _SpotifyPlayerService!
   */
  // spotifyAPI = inject(SPOTIFY_API_PROVIDER);

  spotifyAPI: Spotify.SpotifyWebApiJs = null;

  constructor() {
    this.spotifyAPI = new Spotify();
  }

  async play(musicId: string): Promise<void> {
    await this.spotifyAPI.queue(musicId);
    await this.spotifyAPI.skipToNext();
  }

  async pause(): Promise<void> {
    await this.spotifyAPI.pause();
  }

  async next(): Promise<void> {
    console.log('## CL ## Estou no método next, dentro do [SpotifyPlayerService]');
    await this.spotifyAPI.skipToNext();
  }

  async back(): Promise<void> {
    await this.spotifyAPI.skipToPrevious();
  }
}
