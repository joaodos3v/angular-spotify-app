import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { Music } from 'src/app/models/music.model';
import { SessionService } from './session.service';
import { Artist } from 'src/app/models/artist.model';
import { Playlist } from 'src/app/models/playlist.model';
import {
  convertSportifyPlaylistToCustomPlaylist,
  convertSportifyPlaylistTracksToCustomPlaylist,
  convertSpotifyArtistToCustomArtist,
  convertSpotifyTrackToCustomMusic,
} from 'src/app/common/spotifyHelper';

@Injectable({
  providedIn: 'root',
})
// Note: esse Service utiliza o padrão Singleton
export class OldSpotifyService {
  spotifyAPI: Spotify.SpotifyWebApiJs = null;

  constructor(private sessionService: SessionService) {
    this.spotifyAPI = new Spotify();
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<Playlist[]> {
    const playlists = await this.spotifyAPI.getUserPlaylists(this.sessionService.user.id, { offset, limit });

    // Note: mesma coisa que fazer o "map completo"
    return playlists.items.map(convertSportifyPlaylistToCustomPlaylist);
  }

  async getPlaylistMusics(playlistId: string, offset = 0, limit = 50) {
    const spotifyPlaylist = await this.spotifyAPI.getPlaylist(playlistId);

    if (!spotifyPlaylist) {
      return null;
    }

    const playlist = convertSportifyPlaylistTracksToCustomPlaylist(spotifyPlaylist);
    const spotifyMusics = await this.spotifyAPI.getPlaylistTracks(playlistId, { offset, limit });

    playlist.musics = spotifyMusics.items.map((music) =>
      convertSpotifyTrackToCustomMusic(music.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  async getTopArtists(limit = 10): Promise<Artist[]> {
    const artists = await this.spotifyAPI.getMyTopArtists({ limit });
    return artists.items.map(convertSpotifyArtistToCustomArtist);
  }

  async getMusics(offset = 0, limit = 50): Promise<Music[]> {
    const musics = await this.spotifyAPI.getMySavedTracks({ offset, limit });
    return musics.items.map((music) => convertSpotifyTrackToCustomMusic(music.track));
  }

  async getCurrentMusic(): Promise<Music> {
    const spotifyMusic = await this.spotifyAPI.getMyCurrentPlayingTrack();
    return convertSpotifyTrackToCustomMusic(spotifyMusic.item);
  }

  async playMusic(musicId: string) {
    await this.spotifyAPI.queue(musicId);
    await this.spotifyAPI.skipToNext();
  }
}
