import { User } from 'src/app/models/user.model';
import { Music } from 'src/app/models/music.model';
import { addMilliseconds, format } from 'date-fns';
import { Artist } from 'src/app/models/artist.model';
import { Playlist } from 'src/app/models/playlist.model';
import { newMusic, newPlaylist } from 'src/app/common/factories';

/**
 * ====== FUTURE INTERFACE ======
 */
export interface Helpers {
  convertExternalArtistToCustomArtist(playlist: any): Artist;
  convertExternalMusicToCustomMusic(music: any): Music;
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

export function convertSportifyPlaylistToCustomPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop()?.url,
    musics: [],
  };
}

export function convertSportifyPlaylistTracksToCustomPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): Playlist {
  if (!playlist) {
    return newPlaylist();
  }

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift()?.url,
    musics: [],
  };
}

export function convertSpotifyTrackToCustomMusic(spotifyTrack: SpotifyApi.TrackObjectFull): Music {
  if (!spotifyTrack) {
    return newMusic();
  }

  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.album.id,
      imageUrl: spotifyTrack.album.images.shift().url,
      name: spotifyTrack.album.name,
    },
    artists: spotifyTrack.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    time: msToMinutes(spotifyTrack.duration_ms),
  };
}
