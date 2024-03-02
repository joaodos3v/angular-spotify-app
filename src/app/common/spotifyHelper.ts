import { User } from '../models/user.model';
import { Music } from '../models/music.model';
import { Artist } from '../models/artist.model';
import { addMilliseconds, format } from 'date-fns';
import { Playlist } from '../models/playlist.model';
import { newMusic, newPlaylist } from 'src/app/common/factories';

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

export function convertSpotifyArtistToCustomArtist(playlist: SpotifyApi.ArtistObjectFull): Artist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.sort((a, b) => a.width - b.width).pop()?.url,
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
