import { Component, OnInit, inject } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { ArtistsService } from 'src/app/application/services/artists.service';
import { ArtistItemComponent } from 'src/app/components/artist-item/artist-item.component';

@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [ArtistItemComponent],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss',
})
export class TopArtistsComponent implements OnInit {
  // TODO: inject this via module and check if this is a good practice
  artistsService = inject(ArtistsService);

  artists: Artist[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.artistsService.getTopArtists(5);
  }
}
