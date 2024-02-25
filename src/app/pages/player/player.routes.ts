import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PlaylistComponent } from 'src/app/pages/playlist/playlist.component';

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'playlist/:type/:id',
        component: PlaylistComponent,
      },
    ],
  },
];
