import { IUser } from 'src/app/interfaces/IUser';

export function convertSportifyUserToCustomUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop()?.url,
  };
}
