import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Music } from 'src/app/models/music.model';
import { newMusic } from 'src/app/common/factories';
import { Component, OnDestroy } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [BannerComponent, RightPanelComponent, FaIconComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnDestroy {
  playIcon = faPlay;

  bannerText = '';
  bannerImageUrl = '';
  title = '';

  musics: Music[] = [];
  currentMusic: Music = newMusic();

  subs: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
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

  setPageData(bannerText: string, bannerImageUrl: string, musics: Music[]) {
    this.musics = musics;
    this.bannerImageUrl = bannerImageUrl;
    this.bannerText = bannerText;
  }

  async getPlaylistData(playlistId: string) {
    const playlist = await this.spotifyService.getPlaylistMusics(playlistId);
    this.setPageData(playlist.name, playlist.imageUrl, playlist.musics);
    this.title = `Músicas de: ${playlist.name}`;
  }

  async getArtistData(artistId: string) {
    // TODO
  }

  async playMusic(music: Music) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }

  getArtists(music: Music) {
    return music.artists.map((artist) => artist.name).join(', ');
  }
}
