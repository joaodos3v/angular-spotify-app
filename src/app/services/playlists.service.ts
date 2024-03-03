import { Injectable } from '@angular/core';
import { Playlist } from 'src/app/models/playlist.model';
import { PlaylistsRepository } from '../repositories/playlists.repository';
import { SpotifyPlaylistsRepository } from '../adapters/secondary/spotify/repositories/spotify-playlists.repository';

@Injectable()
export class PlaylistsService implements PlaylistsRepository {
  constructor(private playlistsRepository: SpotifyPlaylistsRepository) {
    // TODO: inject via InjectionToken in a generic way
  }

  async getPlaylists(offset: number = 0, limit: number = 50): Promise<Playlist[]> {
    return await this.playlistsRepository.getPlaylists(offset, limit);
  }

  async getMusicsFromPlaylist(playlistId: string, offset: number = 0, limit: number = 50): Promise<Playlist> {
    return await this.playlistsRepository.getMusicsFromPlaylist(playlistId, offset, limit);
  }
}
