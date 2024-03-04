import Spotify from 'spotify-web-api-js';
import { Injectable, inject } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { SpotifyHelpers } from '../helpers/spotify.helpers';
import { SPOTIFY_API_PROVIDER } from '../providers/spotify-api.provider';
import { ArtistsRepository } from 'src/app/repositories/artists.repository';

@Injectable()
export class SpotifyArtistsRepository implements ArtistsRepository {
  spotifyAPI = inject(SPOTIFY_API_PROVIDER);

  spotifyHelpers = new SpotifyHelpers();

  constructor() {}

  async getTopArtists(limit: number): Promise<Artist[]> {
    const artists = await this.spotifyAPI.getMyTopArtists({ limit });

    return artists.items.map(this.spotifyHelpers.convertExternalArtistToCustomArtist);
  }
}
