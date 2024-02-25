import { IUser } from 'src/app/interfaces/IUser';
import { addMilliseconds, format } from 'date-fns';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import { IArtist } from 'src/app/interfaces/IArtist';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';

export function convertSportifyUserToCustomUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop()?.url,
  };
}

export function convertSportifyPlaylistToCustomPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop()?.url,
  };
}

export function convertSpotifyArtistToCustomArtist(playlist: SpotifyApi.ArtistObjectFull): IArtist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.sort((a, b) => a.width - b.width).pop()?.url,
  };
}

export function convertSpotifyTrackToCustomMusic(spotifyTrack: SpotifyApi.TrackObjectFull): IMusic {
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
