import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const service: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(service.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'])
  return false;
};
