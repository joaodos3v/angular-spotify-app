import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Music } from 'src/app/models/music.model';
import { Artist } from 'src/app/models/artist.model';
import { Playlist } from 'src/app/models/playlist.model';
import { SpotifyConfiguration } from 'src/environments/environment';
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
  spotifyAPI: Spotify.SpotifyWebApiJs = null;

  user: User;

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

  async getUserPlaylists(offset = 0, limit = 50): Promise<Playlist[]> {
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

  async getTopArtists(limit = 10): Promise<Artist[]> {
    const artists = await this.spotifyAPI.getMyTopArtists({ limit });
    return artists.items.map(convertSpotifyArtistToCustomArtist);
  }

  async getMusics(offset = 0, limit = 50): Promise<Music[]> {
    const musics = await this.spotifyAPI.getMySavedTracks({ offset, limit });
    return musics.items.map((music) => convertSpotifyTrackToCustomMusic(music.track));
  }

  async getCurrentMusic(): Promise<Music> {
    const spotifyMusic = await this.spotifyAPI.getMyCurrentPlayingTrack();
    return convertSpotifyTrackToCustomMusic(spotifyMusic.item);
  }

  async playMusic(musicId: string) {
    await this.spotifyAPI.queue(musicId);
    await this.spotifyAPI.skipToNext();
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
