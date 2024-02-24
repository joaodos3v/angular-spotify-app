import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyConfiguration } from 'src/environments/environment';
import { convertSportifyPlaylistToCustomPlaylist, convertSportifyUserToCustomUser } from 'src/app/common/spotifyHelper';
@Injectable({
  providedIn: 'root',
})
// Note: esse Service utiliza o padrão Singleton
export class SpotifyService {
  user: IUser;
  spotifyAPI: Spotify.SpotifyWebApiJs = null;

  constructor() {
    this.spotifyAPI = new Spotify();
  }

  async startUser() {
    if (!!this.user) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      this.setAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;
    } catch (error) {
      return false;
    }
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

  async getSpotifyUser() {
    const userInfo = await this.spotifyAPI.getMe();
    this.user = convertSportifyUserToCustomUser(userInfo);
  }

  setAccessToken(token: string) {
    this.spotifyAPI.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyAPI.getUserPlaylists(this.user.id, { offset, limit });

    // Note: mesma coisa que fazer o "map completo"
    return playlists.items.map(convertSportifyPlaylistToCustomPlaylist);
  }
}
