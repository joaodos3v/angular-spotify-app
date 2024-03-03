import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { Music } from 'src/app/models/music.model';
import { SpotifyHelpers } from '../helpers/spotify.helpers';
import { MusicsRepository } from 'src/app/repositories/musics.repository';

@Injectable()
export class SpotifyMusicsRepository implements MusicsRepository {
  // TODO: transform to InjectionToken
  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  spotifyHelpers = new SpotifyHelpers();

  constructor() {
    this.spotifyAPI = new Spotify();
  }

  async getMusics(offset: number, limit: number): Promise<Music[]> {
    const spotifyMusics = await this.spotifyAPI.getMySavedTracks({ offset, limit });
    return spotifyMusics.items.map((music) => this.spotifyHelpers.convertExternalMusicToCustomMusic(music.track));
  }

  async getCurrentMusic(): Promise<Music> {
    const spotifyMusic = await this.spotifyAPI.getMyCurrentPlayingTrack();
    return this.spotifyHelpers.convertExternalMusicToCustomMusic(spotifyMusic.item);
  }
}
