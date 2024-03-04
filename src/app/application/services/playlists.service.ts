import { Injectable, inject } from '@angular/core';
import { Playlist } from 'src/app/domain/models/playlist.model';
import { PLAYLISTS_REPOSITORY_PROVIDER } from 'src/app/repositories/playlists.repository';

@Injectable()
export class PlaylistsService {
  playlistsRepository = inject(PLAYLISTS_REPOSITORY_PROVIDER);

  constructor() {}

  async getPlaylists(offset: number = 0, limit: number = 50): Promise<Playlist[]> {
    return await this.playlistsRepository.getPlaylists(offset, limit);
  }

  async getMusicsFromPlaylist(playlistId: string, offset: number = 0, limit: number = 50): Promise<Playlist> {
    return await this.playlistsRepository.getMusicsFromPlaylist(playlistId, offset, limit);
  }
}
