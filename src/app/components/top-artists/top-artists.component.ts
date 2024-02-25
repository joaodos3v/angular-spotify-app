import { Component } from '@angular/core';
import { IArtist } from 'src/app/interfaces/IArtist';
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
  artists: IArtist[] = [];

  constructor(private spotifyService: SpotifyService) {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.getTopArtists(5);
  }
}
