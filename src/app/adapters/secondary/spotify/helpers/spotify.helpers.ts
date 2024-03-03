import { Helpers } from 'src/app/common/helpers';
import { Artist } from 'src/app/models/artist.model';

export class SpotifyHelpers implements Helpers {
  convertSpotifyArtistToCustomArtist(playlist: SpotifyApi.ArtistObjectFull): Artist {
    return {
      id: playlist.id,
      name: playlist.name,
      imageUrl: playlist.images.sort((a, b) => a.width - b.width).pop()?.url,
    };
  }
}
