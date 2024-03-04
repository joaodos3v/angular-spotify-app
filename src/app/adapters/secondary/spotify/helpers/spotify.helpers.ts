import { format } from 'date-fns/format';
import { Helpers } from 'src/app/common/helpers';
import { Music } from 'src/app/domain/models/music.model';
import { addMilliseconds } from 'date-fns/addMilliseconds';
import { Artist } from 'src/app/domain/models/artist.model';
import { Playlist } from 'src/app/domain/models/playlist.model';
import { newMusic, newPlaylist } from 'src/app/common/factories';

export class SpotifyHelpers implements Helpers {
  convertExternalArtistToCustomArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): Artist {
    return {
      id: spotifyArtist.id,
      name: spotifyArtist.name,
      imageUrl: spotifyArtist.images.sort((a, b) => a.width - b.width).pop()?.url,
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

  convertExternalPlaylistToCustomPlaylist(spotifyPlaylist: SpotifyApi.PlaylistObjectSimplified): Playlist {
    if (!spotifyPlaylist) {
      return newPlaylist();
    }

    return {
      id: spotifyPlaylist.id,
      name: spotifyPlaylist.name,
      imageUrl: spotifyPlaylist.images.pop()?.url,
      musics: [],
    };
  }
}
