import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { OldSpotifyService } from 'src/app/services/old-spotify.service';
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

  constructor(private oldSpotifyService: OldSpotifyService) {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.oldSpotifyService.getTopArtists(5);
  }
}
