import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(PlayerRoutes), PlayerComponent],
})
export class PlayerModule {}
