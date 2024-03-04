import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { PlayerComponent } from './player.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(PlayerRoutes), PlayerComponent],
})
export class PlayerModule {}
