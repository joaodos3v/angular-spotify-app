import { newArtist } from 'src/app/common/factories';
import { Component, OnInit, inject } from '@angular/core';
import { Artist } from 'src/app/domain/models/artist.model';
import { ArtistsService } from 'src/app/application/services/artists.service';

@Component({
  selector: 'app-top-artist',
  standalone: true,
  imports: [],
  templateUrl: './top-artist.component.html',
  styleUrl: './top-artist.component.scss',
})
export class TopArtistComponent implements OnInit {
  // TODO: inject this via module and check if this is a good practice
  artistsService = inject(ArtistsService);

  topArtist: Artist = newArtist();

  constructor() {}

  ngOnInit(): void {
    this.getArtist();
  }

  async getArtist() {
    const artists = await this.artistsService.getTopArtists(1);

    if (!!artists.length) {
      this.topArtist = artists.pop();
    }
  }
}
