import { Artist } from 'src/app/models/artist.model';
import { ArtistsRepository } from 'src/app/repositories/artists.repository';
import { SpotifyArtistsRepository } from 'src/app/adapters/secondary/spotify/repositories/spotify-artists.repository';
import { Injectable } from '@angular/core';

@Injectable()
export class ArtistsService implements ArtistsRepository {
  constructor(private artistsRepository: SpotifyArtistsRepository) {
    // TODO: inject via InjectionToken in a generic way
  }

  async getTopArtists(limit: number): Promise<Artist[]> {
    return await this.artistsRepository.getTopArtists(limit);
  }
}
