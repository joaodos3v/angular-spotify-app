import { SessionService } from 'src/app/services/session.service';
import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';

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

  const sessionService = inject(SessionService);

  return new Promise(async (res) => {
    const hasCreatedUser = await sessionService.startUser();
    if (hasCreatedUser) {
      res(true);
    } else {
      res(notAuthenticated(router));
    }
  });
};
