import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';

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

  return false;
};
