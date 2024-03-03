import { Artist } from 'src/app/models/artist.model';

export interface ArtistsRepository {
  getTopArtists(limit: number): Promise<Artist[]>;
}
