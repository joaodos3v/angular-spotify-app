import { Injectable, inject } from '@angular/core';
import { Player } from 'src/app/providers/player.provider';
import { SPOTIFY_API_PROVIDER } from '../providers/spotify-api.provider';

@Injectable()
export class SpotifyPlayerService implements Player {
  spotifyAPI = inject(SPOTIFY_API_PROVIDER);

  constructor() {}

  async play(musicId: string): Promise<void> {
    await this.spotifyAPI.queue(musicId);
    await this.spotifyAPI.skipToNext();
  }

  async pause(): Promise<void> {
    await this.spotifyAPI.pause();
  }

  async next(): Promise<void> {
    await this.spotifyAPI.skipToNext();
  }

  async back(): Promise<void> {
    await this.spotifyAPI.skipToPrevious();
  }
}
