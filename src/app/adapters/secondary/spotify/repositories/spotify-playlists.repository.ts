import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { SpotifyHelpers } from '../helpers/spotify.helpers';
import { PlaylistsRepository } from 'src/app/repositories/playlists.repository';
import { SessionService } from 'src/app/services/session.service';

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
    throw new Error('Method not implemented.');
  }
}
