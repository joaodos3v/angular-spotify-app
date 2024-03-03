import { User } from 'src/app/models/user.model';
import { Music } from 'src/app/models/music.model';
import { Artist } from 'src/app/models/artist.model';
import { Playlist } from 'src/app/models/playlist.model';

/**
 * ====== FUTURE INTERFACE ======
 */
export interface Helpers {
  convertExternalArtistToCustomArtist(artist: any): Artist;
  convertExternalMusicToCustomMusic(music: any): Music;
  convertExternalPlaylistToCustomPlaylist(playlist: any): Playlist;
}

/**
 * ====== TEMPORARY FUNCTIONS ======
 */
export function convertSportifyUserToCustomUser(user: SpotifyApi.CurrentUsersProfileResponse): User {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop()?.url,
  };
}
