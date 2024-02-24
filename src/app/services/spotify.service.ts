import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root',
})
// Note: esse Service utiliza o padrão Singleton
export class SpotifyService {
  spotifyAPI: Spotify.SpotifyWebApiJs = null;

  constructor() {
    this.spotifyAPI = new Spotify();
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUri = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = 'response_type=token&show_dialog=true';

    return authEndpoint + clientId + redirectUri + scopes + responseType;
  }

  getTokenFromUrlCallback() {
    if (!window.location.hash) {
      return '';
    }

    const params = window.location.href.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyAPI.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}
