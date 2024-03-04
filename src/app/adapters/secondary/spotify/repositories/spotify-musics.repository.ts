import Spotify from 'spotify-web-api-js';
import { Injectable, inject } from '@angular/core';
import { Music } from 'src/app/models/music.model';
import { SpotifyHelpers } from '../helpers/spotify.helpers';
import { MusicsRepository } from 'src/app/repositories/musics.repository';
import { SPOTIFY_API_PROVIDER } from '../providers/spotify-api.provider';

@Injectable()
export class SpotifyMusicsRepository implements MusicsRepository {
  spotifyAPI = inject(SPOTIFY_API_PROVIDER);

  spotifyHelpers = new SpotifyHelpers();

  constructor() {}

  async getMusics(offset: number, limit: number): Promise<Music[]> {
    const spotifyMusics = await this.spotifyAPI.getMySavedTracks({ offset, limit });
    return spotifyMusics.items.map((music) => this.spotifyHelpers.convertExternalMusicToCustomMusic(music.track));
  }

  async getCurrentMusic(): Promise<Music> {
    const spotifyMusic = await this.spotifyAPI.getMyCurrentPlayingTrack();
    return this.spotifyHelpers.convertExternalMusicToCustomMusic(spotifyMusic.item);
  }
}
