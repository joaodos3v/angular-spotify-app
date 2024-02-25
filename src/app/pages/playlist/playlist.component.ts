import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { newMusic } from 'src/app/common/factories';
import { IMusic } from 'src/app/interfaces/IMusic';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnDestroy {
  playIcon = faPlay;

  bannerText = '';
  bannerImageUrl = '';

  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  subs: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.getMusics();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getMusics() {
    // Note: usamos subscribe aqui para que não precisemos recarregar todo o componente, e sim apenas refazer as buscas derivadas dos parâmetros da URL
    const sub = this.activatedRoute.paramMap.subscribe(async (params) => {
      const type = params.get('type');
      const id = params.get('id');

      await this.getPageData(type, id);
    });

    this.subs.push(sub);
  }

  async getPageData(type: string, id: string) {
    if (type === 'custom') {
      await this.getPlaylistData(id);
    } else if (type === 'artist') {
      await this.getArtistData(id);
    }
  }

  async getPlaylistData(playlistId: string) {}

  async getArtistData(artistId: string) {}
}
