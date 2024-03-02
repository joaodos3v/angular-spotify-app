import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { SpotifyPlayerService } from 'src/app/adapters/secondary/spotify/services/spotify-player.service';

@NgModule({
  declarations: [],
  providers: [SpotifyPlayerService],
  imports: [CommonModule, RouterModule.forChild(PlayerRoutes), PlayerComponent],
})
export class PlayerModule {}
