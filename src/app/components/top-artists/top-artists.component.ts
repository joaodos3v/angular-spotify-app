import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ArtistItemComponent } from 'src/app/components/artist-item/artist-item.component';

@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [ArtistItemComponent],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss',
})
export class TopArtistsComponent {
  artists: Artist[] = [];

  constructor(private spotifyService: SpotifyService) {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.getTopArtists(5);
  }
}
