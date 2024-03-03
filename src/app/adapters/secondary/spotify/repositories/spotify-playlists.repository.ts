import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { SpotifyHelpers } from '../helpers/spotify.helpers';
import { PlaylistsRepository } from 'src/app/repositories/playlists.repository';
import { SessionService } from 'src/app/application/services/session.service';

@Injectable()
export class SpotifyPlaylistsRepository implements PlaylistsRepository {
  // TODO: transform to InjectionToken
  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  spotifyHelpers = new SpotifyHelpers();

  constructor(private sessionService: SessionService) {
    this.spotifyAPI = new Spotify();

    // TODO: inject sessionService via InjectionToken in a generic way
  }

  async getPlaylists(offset: number, limit: number): Promise<Playlist[]> {
    const spotifyPlaylists = await this.spotifyAPI.getUserPlaylists(this.sessionService.user.id, { offset, limit });
    return spotifyPlaylists.items.map(this.spotifyHelpers.convertExternalPlaylistToCustomPlaylist);
  }

  async getMusicsFromPlaylist(playlistId: string, offset: number, limit: number): Promise<Playlist> {
    const spotifyPlaylist = await this.spotifyAPI.getPlaylist(playlistId);

    if (!spotifyPlaylist) {
      return null;
    }

    // TODO: it can be simplified
    const playlist = this.spotifyHelpers.convertExternalPlaylistToCustomPlaylist(spotifyPlaylist);
    const spotifyMusics = await this.spotifyAPI.getPlaylistTracks(playlistId, { offset, limit });

    playlist.musics = spotifyMusics.items.map((music) =>
      this.spotifyHelpers.convertExternalMusicToCustomMusic(music.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }
}
