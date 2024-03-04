import { InjectionToken } from '@angular/core';
import { Playlist } from 'src/app/domain/models/playlist.model';

export interface PlaylistsRepository {
  getPlaylists(offfset: number, limit: number): Promise<Playlist[]>;
  getMusicsFromPlaylist(playlistId: string, offset: number, limit: number): Promise<Playlist>;
}

export const PLAYLISTS_REPOSITORY_PROVIDER = new InjectionToken<PlaylistsRepository>('PLAYLISTS_REPOSITORY_PROVIDER');
