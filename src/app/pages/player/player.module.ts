import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { ArtistsService } from 'src/app/services/artists.service';
import { SpotifyPlayerService } from 'src/app/adapters/secondary/spotify/services/spotify-player.service';
import { SpotifyArtistsRepository } from 'src/app/adapters/secondary/spotify/repositories/spotify-artists.repository';
import { MusicsService } from 'src/app/services/musics.service';
import { SpotifyMusicsRepository } from 'src/app/adapters/secondary/spotify/repositories/spotify-musics.repository';

@NgModule({
  declarations: [],
  providers: [SpotifyPlayerService, SpotifyArtistsRepository, SpotifyMusicsRepository, ArtistsService, MusicsService],
  imports: [CommonModule, RouterModule.forChild(PlayerRoutes), PlayerComponent],
})
export class PlayerModule {}
