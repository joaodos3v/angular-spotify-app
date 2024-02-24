import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

const notAuthenticated = () => {
  const router = inject(Router);

  localStorage.clear();
  router.navigate(['/login']);
  return false;
};

// Note: impede o carregamento do Módulo até acabar todo o processamento (ex: promise com setTimeout)
export const AuthenticatedGuard: CanMatchFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return notAuthenticated();
  }

  const spotifyService = inject(SpotifyService);

  return new Promise((res) => {
    const hasCreatedUser = spotifyService.startUser();
    if (hasCreatedUser) {
      res(true);
    } else {
      res(notAuthenticated());
    }
  });
};
