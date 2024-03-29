import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { newMusic } from 'src/app/common/factories';
import { Music } from 'src/app/domain/models/music.model';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Component, OnDestroy, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { PLAYER_PROVIDER } from 'src/app/providers/player.provider';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { PlaylistsService } from 'src/app/application/services/playlists.service';
import { CurrentMusicService } from 'src/app/application/services/current-music.service';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [BannerComponent, RightPanelComponent, FaIconComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnDestroy {
  playerService = inject(PLAYER_PROVIDER);
  playlistsService = inject(PlaylistsService);

  playIcon = faPlay;

  bannerText = '';
  bannerImageUrl = '';
  title = '';

  musics: Music[] = [];
  currentMusic: Music = newMusic();

  subs: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private currentMusicService: CurrentMusicService) {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.currentMusicService.currentMusic.subscribe((music) => {
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
    const playlist = await this.playlistsService.getMusicsFromPlaylist(playlistId);
    this.setPageData(playlist.name, playlist.imageUrl, playlist.musics);
    this.title = `Músicas de: ${playlist.name}`;
  }

  async getArtistData(artistId: string) {
    // TODO
  }

  async playMusic(music: Music) {
    await this.playerService.play(music.id);
    this.currentMusicService.setCurrentMusic(music);
  }

  getArtists(music: Music) {
    return music.artists.map((artist) => artist.name).join(', ');
  }
}
