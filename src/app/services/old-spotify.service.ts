import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import {
  convertSportifyPlaylistTracksToCustomPlaylist,
  convertSpotifyTrackToCustomMusic,
} from 'src/app/common/helpers';

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

  async playMusic(musicId: string) {
    await this.spotifyAPI.queue(musicId);
    await this.spotifyAPI.skipToNext();
  }
}
