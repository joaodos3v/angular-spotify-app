import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { newArtist } from 'src/app/common/factories';
import { OldSpotifyService } from 'src/app/services/old-spotify.service';

@Component({
  selector: 'app-top-artist',
  standalone: true,
  imports: [],
  templateUrl: './top-artist.component.html',
  styleUrl: './top-artist.component.scss',
})
export class TopArtistComponent implements OnInit {
  topArtist: Artist = newArtist();

  constructor(private oldSpotifyService: OldSpotifyService) {}

  ngOnInit(): void {
    this.getArtist();
  }

  async getArtist() {
    const artists = await this.oldSpotifyService.getTopArtists(1);

    if (!!artists.length) {
      this.topArtist = artists.pop();
    }
  }
}
