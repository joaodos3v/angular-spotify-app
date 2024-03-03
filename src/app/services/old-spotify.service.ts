import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
// Note: esse Service utiliza o padrão Singleton
export class OldSpotifyService {
  spotifyAPI: Spotify.SpotifyWebApiJs = null;

  constructor(private sessionService: SessionService) {
    this.spotifyAPI = new Spotify();

    // TODO: inject playlistsService via InjectionToken in a generic way
  }

  async playMusic(musicId: string) {
    await this.spotifyAPI.queue(musicId);
    await this.spotifyAPI.skipToNext();
  }
}
