import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authRediectGuard: CanActivateFn = (route, state) => {
  let isLoggedIn = false;
  inject(AuthService).currentUser.subscribe(user => { 
    isLoggedIn = !!user;
  });
  if(isLoggedIn) inject(Router).navigate(['/signin']);
  else return true;
  return true
};
