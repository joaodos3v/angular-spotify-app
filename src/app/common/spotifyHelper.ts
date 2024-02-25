import { IUser } from 'src/app/interfaces/IUser';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { IArtist } from 'src/app/interfaces/IArtist';

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
