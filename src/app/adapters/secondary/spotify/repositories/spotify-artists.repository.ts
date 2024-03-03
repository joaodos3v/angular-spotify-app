import Spotify from 'spotify-web-api-js';
import { Injectable } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { ArtistsRepository } from 'src/app/repositories/artists.repository';
import { SpotifyHelpers } from '../helpers/spotify.helpers';

@Injectable()
export class SpotifyArtistsRepository implements ArtistsRepository {
  // TODO: transform to InjectionToken
  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  spotifyHelpers = new SpotifyHelpers();

  constructor() {
    this.spotifyAPI = new Spotify();
  }

  async getTopArtists(limit: number): Promise<Artist[]> {
    const artists = await this.spotifyAPI.getMyTopArtists({ limit });

    return artists.items.map(this.spotifyHelpers.convertExternalArtistToCustomArtist);
  }
}
