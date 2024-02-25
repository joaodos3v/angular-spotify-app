import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { IArtist } from 'src/app/interfaces/IArtist';
import { IMusic } from 'src/app/interfaces/IMusic';
import { SpotifyConfiguration } from 'src/environments/environment';
import { Router } from '@angular/router';
import {
  convertSportifyPlaylistToCustomPlaylist,
  convertSportifyPlaylistTracksToCustomPlaylist,
  convertSportifyUserToCustomUser,
  convertSpotifyArtistToCustomArtist,
  convertSpotifyTrackToCustomMusic,
} from 'src/app/common/spotifyHelper';

@Injectable({
  providedIn: 'root',
})
// Note: esse Service utiliza o padrão Singleton
export class SpotifyService {
  user: IUser;
  spotifyAPI: Spotify.SpotifyWebApiJs = null;

  constructor(private router: Router) {
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

  async getPlaylistMusics(playlistId: string, offset = 0, limit = 50) {
    const spotifyPlaylist = await this.spotifyAPI.getPlaylist(playlistId);

    if (!spotifyPlaylist) {
      return null;
    }

    const playlist = convertSportifyPlaylistTracksToCustomPlaylist(spotifyPlaylist);
    const spotifyMusics = await this.spotifyAPI.getPlaylistTracks(playlistId, { offset, limit });

    playlist.musics = spotifyMusics.items.map((music) =>
      convertSpotifyTrackToCustomMusic(music.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  async getTopArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyAPI.getMyTopArtists({ limit });
    return artists.items.map(convertSpotifyArtistToCustomArtist);
  }

  async getMusics(offset = 0, limit = 50): Promise<IMusic[]> {
    const musics = await this.spotifyAPI.getMySavedTracks({ offset, limit });
    return musics.items.map((music) => convertSpotifyTrackToCustomMusic(music.track));
  }

  async playMusic(musicId: string) {
    await this.spotifyAPI.queue(musicId);
    await this.spotifyAPI.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic> {
    const spotifyMusic = await this.spotifyAPI.getMyCurrentPlayingTrack();
    return convertSpotifyTrackToCustomMusic(spotifyMusic.item);
  }

  async backMusic() {
    await this.spotifyAPI.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyAPI.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
