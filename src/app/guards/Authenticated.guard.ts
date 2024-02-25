import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

const notAuthenticated = (router: Router) => {
  localStorage.clear();
  router.navigate(['/login']);
  return false;
};

// Note: impede o carregamento do Módulo até acabar todo o processamento (ex: promise com setTimeout)
export const AuthenticatedGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    return notAuthenticated(router);
  }

  const spotifyService = inject(SpotifyService);

  return new Promise(async (res) => {
    const hasCreatedUser = await spotifyService.startUser();
    if (hasCreatedUser) {
      res(true);
    } else {
      res(notAuthenticated(router));
    }
  });
};
