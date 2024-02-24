import { IUser } from 'src/app/interfaces/IUser';
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
