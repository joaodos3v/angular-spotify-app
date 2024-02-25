import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { HomeComponent } from 'src/app/pages/home/home.component';

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];
