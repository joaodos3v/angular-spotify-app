import { format } from 'date-fns/format';
import { Helpers } from 'src/app/common/helpers';
import { Music } from 'src/app/models/music.model';
import { newMusic } from 'src/app/common/factories';
import { Artist } from 'src/app/models/artist.model';
import { addMilliseconds } from 'date-fns/addMilliseconds';

export class SpotifyHelpers implements Helpers {
  convertExternalArtistToCustomArtist(playlist: SpotifyApi.ArtistObjectFull): Artist {
    return {
      id: playlist.id,
      name: playlist.name,
      imageUrl: playlist.images.sort((a, b) => a.width - b.width).pop()?.url,
    };
  }

  convertExternalMusicToCustomMusic(spotifyTrack: SpotifyApi.TrackObjectFull): Music {
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
}
