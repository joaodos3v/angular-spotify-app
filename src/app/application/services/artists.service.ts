import { Injectable, inject } from '@angular/core';
import { Artist } from 'src/app/domain/models/artist.model';
import { ARTISTS_REPOSITORY_PROVIDER } from 'src/app/repositories/artists.repository';

@Injectable()
export class ArtistsService {
  artistsRepository = inject(ARTISTS_REPOSITORY_PROVIDER);

  constructor() {}

  async getTopArtists(limit: number): Promise<Artist[]> {
    return await this.artistsRepository.getTopArtists(limit);
  }
}
