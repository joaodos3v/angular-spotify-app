import { SessionService } from 'src/app/application/services/session.service';
import { inject } from '@angular/core';
import { type CanMatchFn } from '@angular/router';

// Note: impede o carregamento do Módulo até acabar todo o processamento (ex: promise com setTimeout)
export const AuthenticatedGuard: CanMatchFn = (route, state) => {
  const sessionService = inject(SessionService);

  const token = localStorage.getItem('token');
  if (!token) {
    return sessionService.logout();
  }

  return new Promise(async (res) => {
    const hasCreatedUser = await sessionService.startUser();
    if (hasCreatedUser) {
      res(true);
    } else {
      res(sessionService.logout());
    }
  });
};
