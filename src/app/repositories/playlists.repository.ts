import { Playlist } from 'src/app/models/playlist.model';

export interface PlaylistsRepository {
  getPlaylists(limit: number): Promise<Playlist[]>;
  getMusicsFromPlaylist(playlistId: string, offset: number, limit: number): Promise<Playlist>;
}
