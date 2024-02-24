import { Routes } from '@angular/router';
import { AuthenticatedGuard } from './guards/Authenticated.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Note: garante que o nome da rota deva ser idêntico para ser redirecionado
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then((m) => m.PlayerModule),
    canMatch: [AuthenticatedGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
];
