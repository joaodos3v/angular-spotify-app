import { InjectionToken } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';

export interface ArtistsRepository {
  getTopArtists(limit: number): Promise<Artist[]>;
}

export const ARTISTS_REPOSITORY_PROVIDER = new InjectionToken<ArtistsRepository>('ARTISTS_REPOSITORY_PROVIDER');
