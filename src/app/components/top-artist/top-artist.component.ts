import { Component } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { newArtist } from 'src/app/common/factories';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artist',
  standalone: true,
  imports: [],
  templateUrl: './top-artist.component.html',
  styleUrl: './top-artist.component.scss',
})
export class TopArtistComponent {
  topArtist: Artist = newArtist();

  constructor(private spotifyService: SpotifyService) {
    this.getArtist();
  }

  async getArtist() {
    const artists = await this.spotifyService.getTopArtists(1);

    if (!!artists.length) {
      this.topArtist = artists.pop();
    }
  }
}
